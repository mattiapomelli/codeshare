import { MODIFY_USER_PASSWORD } from '@/graphql/mutations'
import { GET_USER_BY_EMAIL_QUERY } from '@/graphql/queries'
import graphQLClientAdmin from '@/graphql/client'
import bcrypt from 'bcrypt'
import sendMail from '@/utils/mailer'
import { retrieveMail, newPasswordEmail } from '@/utils/emailHTML'

function makeNewPassword(length) {
	var result = ''
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

async function getUserByEmail(email) {
	const data = await graphQLClientAdmin.request(GET_USER_BY_EMAIL_QUERY, {
		email,
	})
	return data.user
}

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { email } = req.body
			//check if email exists
			const userData = await getUserByEmail(email)
			if (userData.length == 0)
				throw new Error('No account associated to this email')

			await sendMail(
				email,
				'Forgot Password',
				retrieveMail(email, userData[0].id)
			)

			return res.status(201).send({
				message: 'Check your email to complete password reset',
				type: 'success',
			})
		} catch (err) {
			res
				.status(err.status || 500)
				.send({ message: err.message || 'Something went wrong' })
		}
	} else if (req.method === 'GET') {
		try {
			const { id, email } = req.query

			//create new password
			const newPassword = makeNewPassword(10)
			//modify password
			const hashedPassword = await bcrypt.hash(newPassword, 10)

			//create variable object
			const variables = {
				id,
				password: hashedPassword,
			}

			//call mutation query
			const data = await graphQLClientAdmin.request(
				MODIFY_USER_PASSWORD,
				variables
			)

			sendMail(email, 'New Password', newPasswordEmail(newPassword))

			res
				.status(301)
				.redirect(
					`/login?message=${'Your new password has been sent to your email'}`
				)
		} catch (err) {
			res
				.status(err.status || 500)
				.redirect(`/login?error=${'Something went wrong'}`)
		}
	} else {
		// Any method that is not POST or GET
		res.status(401).send('Method unauthorized')
	}
}
