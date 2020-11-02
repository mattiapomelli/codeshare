import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { request, gql } from 'graphql-request'

const endpoint = "https://climbing-bear-85.hasura.app/v1/graphql"

async function getUser(email) {

    const query = gql`
        query MyQuery ($email: String!) {
            user(where: {email: {_eq: $email}}) {
                id
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
    })
]

const callbacks = {
    signIn: async (user, account, metadata) => {
        // get email from github
        const emailRes = await fetch('https://api.github.com/user/emails', {
            headers: {
                'Authorization': `token ${account.accessToken}`
            }
        })
        const emails = await emailRes.json()
        const primaryEmail = emails.find(e => e.primary).email;

        // check if user already exists in the databse
        const res = await getUser(primaryEmail)
        if(res[0] !== undefined) {                  // if user exists return his id
            user.id = res[0].id
            return true
        } else {                                    // otherwise create new User
            const newUser = {
                username: metadata.login,       
                email: primaryEmail,                    
                provider: "github"
            }

            user.id = await saveUser(newUser)       // get id of new user
            return true                             // user object gets passed to jwt callback
        }
    },

    jwt: async (token, user) => {
        if (user) {
            token.id = user.id              // save id in jwt token
            //token.email = null;           // if don't want to save the email in the jwt
        }
        return Promise.resolve(token)       // token object gets passed to session callback
    },

    session: async (session, token) => {
        session.user.id = token.id          // attach user id to session
        return Promise.resolve(session)     // session will be available on the client
    }
}

const options = {
    providers,
    callbacks,
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
}

export default (req, res) => NextAuth(req, res, options)