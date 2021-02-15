import type { NextApiRequest, NextApiResponse } from 'next'
import graphQLClientAdmin from '@/graphql/client'
import { CONFIRM_USER_EMAIL } from '@/graphql/mutations'

const confirmUserEmail = async (variables) => {
	const data = await graphQLClientAdmin.request(CONFIRM_USER_EMAIL, variables)
	return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			// Get user data from body
			const id = req.query.id

			const userId = { id: id }

			const data = await confirmUserEmail(userId)

			// if query executes correctly redirects to homepage
			if (data.user.verificated) {
				const message =
					'Account verificated succesfully! Please login to get started'

				res.redirect(301, `/login?message=${message}`) //?verificated=true
			} else {
				throw new Error()
			}
		} catch (err) {
			res.redirect(301, `/login?error=${'Something went wrong'}`)
		}
	} else {
		// Any method that is not POST
		res.status(401).send('Method unauthorized')
	}
}
