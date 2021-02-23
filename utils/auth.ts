import jwt from 'jsonwebtoken'

export const signAccessToken = async (id: string) => {
  const expireTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 5 // expire time: 5 days

  const hasuraToken = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['viewer', 'user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': id,
    },
    exp: expireTime,
  }

  const token = await jwt.sign(hasuraToken, process.env.JWT_SECRET, {
    algorithm: 'HS256',
  })

  const accessToken = {
    jwt: token,
    expires: expireTime,
  }

  return accessToken
}
