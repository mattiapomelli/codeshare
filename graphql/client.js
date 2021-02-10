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

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL)

export const executeQuery = async (query, variables) => {
	const session = await getSession()

	return graphQLClient
		.setHeaders({
			authorization: `Bearer ${session.user.jwt}`,
		})
		.request(query, variables)
}

export default graphQLClientAdmin
