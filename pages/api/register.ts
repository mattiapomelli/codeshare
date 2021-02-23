import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { CREATE_USER_MUTATION } from '@/graphql/mutations'
import {
  GET_USER_BY_EMAIL_QUERY,
  GET_USER_BY_USERNAME_QUERY,
} from '@/graphql/queries'
import graphQLClientAdmin from '@/graphql/client'
import { emailVerification } from '@/utils/email-html'
import validateRegisterInput from '@/utils/register-validation'
import sendMail from '@/utils/mailer'

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

const saveUser = async (variables) => {
  const data = await graphQLClientAdmin.request(CREATE_USER_MUTATION, variables)

  return data.user
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

      const userData = await saveUser(user)

      // after query returns send email verification link
      await sendMail(
        user.email,
        'Email verification',
        emailVerification(username, userData.id)
      )

      return res.status(201).send({
        message: 'Check your email to verify your account',
        type: 'success',
      })
    } catch (err) {
      res
        .status(err.status || 500)
        .send({ message: err.message || 'Something went wrong' })
    }
  } else {
    // Any method that is not POST
    res.status(401).send('Method unauthorized')
  }
}
