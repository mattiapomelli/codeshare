import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import graphQLClientAdmin from '@/graphql/client'
import { GET_USER_BY_EMAIL_QUERY } from '@/graphql/queries'
import { CREATE_USER_FROM_GITHUB_MUTATION } from '@/graphql/mutations'
import bcrypt from 'bcrypt'
import { signAccessToken } from '@/utils/auth'

type Email = {
  email: string
  primary: boolean
  verified?: boolean
  visibility?: string
}

type EmailResponse = Email[]

async function getUserByEmail(email) {
  const variables = { email: email }
  const data = await graphQLClientAdmin.request(
    GET_USER_BY_EMAIL_QUERY,
    variables
  )
  return data.user
}

async function saveUser(variables) {
  const data = await graphQLClientAdmin.request(
    CREATE_USER_FROM_GITHUB_MUTATION,
    variables
  )
  return data.user.id
}

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scope: ['read:user', 'user:email'],
  }),
  Providers.Credentials({
    name: 'credentials',
    authorize: async (credentials) => {
      // get user from database
      const result = await getUserByEmail(credentials.email)
      const user = result[0]

      // check if user exists and is verificated
      if (!user) return Promise.reject(new Error('User not found'))
      if (!user.verificated)
        return Promise.reject(
          new Error(
            'User not verificated, check your email to verify your account'
          )
        )

      // check if password matches
      const matched = await bcrypt.compare(credentials.password, user.password)
      if (!matched) return Promise.reject(new Error('Wrong password'))

      return Promise.resolve(user) // user object gets passed to signIn callback and then to jwt callback
    },
  }),
]
// TODO: better error handling
const callbacks = {
  signIn: async (user, account, metadata) => {
    // if user signed in with credentials validation has already been made in 'authorize' callback, so skip to jwt callback
    if (account.id === 'credentials') {
      // metadata here contains email&password?
      return true
    }

    // GitHub Auth:
    // get email from github
    const emailRes = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${account.accessToken}`,
      },
    })

    const emails: EmailResponse = await emailRes.json()
    const primaryEmail = emails.find((e) => e.primary).email
    // check if user already exists in the database
    const res = await getUserByEmail(primaryEmail)
    const userData = res[0]

    if (userData) {
      // user already exists
      if (userData.provider !== 'github') {
        return Promise.reject(
          new Error('Email is already associated to an account')
        )
      }
      user.id = userData.id
      user.username = userData.username
      return true
    } else {
      // user doesn't exist, create new user
      const newUser = {
        username: metadata.login,
        email: primaryEmail,
        provider: 'github',
      }

      user.id = await saveUser(newUser) // save new user to the database
      user.username = newUser.username
      return true // user object gets passed to jwt callback
    }
  },

  jwt: async (token, user) => {
    if (user) {
      // user is signin in, sign hasura access token

      token.accessToken = await signAccessToken(user.id)

      token.id = user.id
      token.username = user.username
      delete token.email // don't save the email in the jwt
    } else {
      // if access token is expired get a new access token
      if (token.accessToken.expires <= Date.now() / 1000) {
        token.accessToken = await signAccessToken(token.id)
      }
    }

    return Promise.resolve(token) // token object gets passed to session callback
  },

  session: async (session, token) => {
    // attach user id, username and hasura access token to session object
    session.user.id = token.id
    session.user.username = token.username
    session.accessToken = token.accessToken

    return Promise.resolve(session) // session returned here will be available on the client
  },
}

const options = {
  providers,
  callbacks,
  session: {
    jwt: true,
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}

export default (req, res) => NextAuth(req, res, options)
