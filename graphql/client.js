import { GraphQLClient } from 'graphql-request'
import { getSession } from 'next-auth/client'

const graphQLClientAdmin = new GraphQLClient(
	process.env.NEXT_PUBLIC_HASURA_URL,
	{
		headers: {
			'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
		},
	}
)

export default graphQLClientAdmin

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL)

export const fetcher = async (query, variables) => {
	return graphQLClient.request(query, variables)
}

export const authFetcher = async (query, variables) => {
	const session = await getSession()

	const headers = session && {
		authorization: `Bearer ${session.user.jwt}`,
	}

	return graphQLClient
		.setHeaders({
			...headers,
		})
		.request(query, variables)
}
