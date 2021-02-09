import bcrypt from 'bcrypt'
import { CREATE_USER_MUTATION } from '../../graphql/mutations'
import {
	GET_USER_BY_EMAIL_QUERY,
	GET_USER_BY_USERNAME_QUERY,
} from '../../graphql/queries'
import graphQLClientAdmin from '../../graphql/client'
import { emailVerification } from '../../utils/emailHTML'
import validateRegisterInput from '../../utils/registerValidation'
import sendMail from '../../utils/mailer'

async function getUserByEmail(email) {
	const data = await graphQLClientAdmin.request(GET_USER_BY_EMAIL_QUERY, {
		email,
	})
	return data.user
}

async function getUserByUsername(username) {
	const data = await graphQLClientAdmin.request(GET_USER_BY_USERNAME_QUERY, {
		username,
	})
	return data.user
}

// TODO: error handling
export default async (req, res) => {
	// saves user to the database
	const execute = async variables => {
		//console.log(variables)
		const data = await graphQLClientAdmin.request(
			CREATE_USER_MUTATION,
			variables
		)
		// return: data to return have to be JSON FORMAT !!
		return data.user
	}

	if (req.method === 'POST') {
		try {
			const validationError = validateRegisterInput(req.body)
			if (validationError) throw validationError

			// Get user data from body
			const { username, email, password } = req.body

			const emails = await getUserByEmail(email)
			if (emails.length > 0)
				throw new Error('A user with this email already exists')

			const usernames = await getUserByUsername(username)
			if (usernames.length > 0) throw new Error('Username is already taken')

			const hashedPassword = await bcrypt.hash(password, 10)

			const user = { username, email, password: hashedPassword }

			const userData = await execute(user)

			// after query return send email verification link,
			//if error in query the @try@catch block will catch the error
			//all sensitive data are located in process.env file
			await sendMail(
				user.email,
				'Email verification',
				emailVerification(username, userData.id)
			)

			return res
				.status(201)
				.send({
					message: 'Check your email to verify your account',
					type: 'success',
				})
		} catch (err) {
			res.status(err.status || 500).send({ message: err.message })
		}
	} else {
		// Any method that is not POST
		res.status(401).send('Method unauthorized')
	}
}
