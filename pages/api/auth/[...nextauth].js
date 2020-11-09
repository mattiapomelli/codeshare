import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { request, gql } from 'graphql-request'
import bcrypt from 'bcrypt'

const endpoint = "https://climbing-bear-85.hasura.app/v1/graphql"

async function getUserByEmail(email) {

    const query = gql`
        query MyQuery ($email: String!) {
            user(where: {email: {_eq: $email}}) {
                id
                verificated
                password
                email
                username
            }
        }
    `
    const variables = {email: email}
    const res = await request(endpoint, query, variables)
    return res.user
}

async function saveUser(variables) {
    
    const query = gql`
        mutation($username:String!, $email:String!,$password:String, $provider: String){
            insert_user_one(object:{
                email:$email
                username:$username
                password:$password
                provider:$provider
                verificated: true
            })
                {
                    id
                    createdAt
                }
            }
    `

    const data = await request(endpoint, query, variables)
    return JSON.stringify(data.insert_user_one.id)
}

const providers = [
    Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Providers.Credentials({
        name: 'credentials',
        authorize: async (credentials) => {
            // get user from database
            const result = await getUserByEmail(credentials.email)
            const user = result[0]

            // check if user exists and is verificated
            if(!user) return Promise.reject(new Error('User not found'))
            if(!user.verificated) return Promise.reject(new Error('User not verificated'))

            // check if password matches
            const matched = await bcrypt.compare(credentials.password, result[0].password)
            if(!matched) return Promise.reject(new Error('Wrong password'))

            return Promise.resolve(user)    // user object gets passed to signIn callback
        }
      })
]
// TODO: error handling
const callbacks = {
    signIn: async (user, account, metadata) => {
        // if user signed in with credentials validation has already been made in 'authorize' function, so skip to jwt callback
        if(account.id === "credentials") {          
            return true
        }

        // GitHub Auth:
        // get email from github
        const emailRes = await fetch('https://api.github.com/user/emails', {
            headers: {
                'Authorization': `token ${account.accessToken}`
            }
        })
        const emails = await emailRes.json()
        const primaryEmail = emails.find(e => e.primary).email;

        // check if user already exists in the database
        const res = await getUserByEmail(primaryEmail)
        const userData = res[0]

        if(userData) {                              // user already exists
            user.id = userData.id
            user.username = userData.username
            return true
        } else {                                    // user doesn't exist, create new user
            const newUser = {
                username: metadata.login,       
                email: primaryEmail,                    
                provider: "github"
            }

            user.id = await saveUser(newUser)       // save new user to the database
            user.username = newUser.username
            return true                             // user object gets passed to jwt callback
        }
    },

    jwt: async (token, user) => {
        if (user) {
            // save id and username in the jwt
            token.id = user.id              
            token.username = user.username
            //token.email = null;                   // if don't want to save the email in the jwt
        }
        return Promise.resolve(token)               // token object gets passed to session callback
    },

    session: async (session, token) => {
        // attach user id and username to session object
        session.user.id = token.id                  
        session.user.username = token.username
        return Promise.resolve(session)             // session returned here will be available on the client
    }
}

const options = {
    providers,
    callbacks,
    session: {
        jwt: true
    },
    secret: process.env.AUTH_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET
    },
    pages: {
        signIn: '/login',
        error: '/login'
    }
}

export default (req, res) => NextAuth(req, res, options)