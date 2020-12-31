import { GraphQLClient } from "graphql-request"

const graphQLClientAdmin = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL, {
    headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
    }
})

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL)

export const executeQuery = async (query, variables, jwt) => {
    return graphQLClient.setHeaders({
        authorization: `Bearer ${jwt}`
    }).request(query, variables)
}

export default graphQLClientAdmin