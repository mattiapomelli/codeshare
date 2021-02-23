import type { NextApiRequest, NextApiResponse } from 'next'
import { MODIFY_USER_PASSWORD } from '@/graphql/mutations'
import { GET_USER_BY_ID_QUERY } from '@/graphql/queries'
import graphQLClientAdmin from '@/graphql/client'
import bcrypt from 'bcrypt'
import validatePassword from '@/utils/password-validation'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { id, oldPassword, newPassword } = req.body

      const result = await graphQLClientAdmin.request(GET_USER_BY_ID_QUERY, {
        id,
      })
      const { user } = result
      if (!user) throw new Error()

      const matched = await bcrypt.compare(oldPassword, user.password)
      if (!matched) throw new Error('Current password is not correct')

      const validationError = validatePassword(newPassword)
      if (validationError) throw validationError

      //modify password
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      //create variable object
      const variables = {
        id,
        password: hashedPassword,
      }

      //call mutation query
      await graphQLClientAdmin.request(MODIFY_USER_PASSWORD, variables)

      return res
        .status(201)
        .send({ message: 'Password changed succesfully', type: 'success' })
    } catch (err) {
      res
        .status(err.status || 500)
        .send({ message: err.message || 'Something went wrong' })
    }
  } else {
    // Any method that is not POST or GET
    res.status(401).send('Method unauthorized')
  }
}
