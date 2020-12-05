import { GraphQLClient } from "graphql-request"

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL, {
    headers: {
        "x-hasura-admin-secret": "UNIMI2020"
    }
})

export default graphQLClient