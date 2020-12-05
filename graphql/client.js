import { GraphQLClient } from "graphql-request"

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL, {
    headers: {
        "x-hasura-admin-secret": "UNIMI2020"
    }
})

const graphQLClient2 = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL)

export const executeQuery = async (query, variables, jwt) => {
    return graphQLClient2.setHeaders({
        authorization: `Bearer ${jwt}`
    }).request(query, variables)
}

export default graphQLClient