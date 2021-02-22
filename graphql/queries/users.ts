import { gql } from 'graphql-request'

export const GET_USER_BY_EMAIL_QUERY = gql`
	query GetUserByEmail($email: String!) {
		user(where: { email: { _eq: $email } }) {
			id
			verificated
			password
			email
			username
			provider
		}
	}
`

export const GET_USER_BY_USERNAME_QUERY = gql`
	query GetUserByUsername($username: String!) {
		user(where: { username: { _eq: $username } }) {
			username
		}
	}
`

export const GET_USER_BY_ID_QUERY = gql`
	query GetUserById($id: uuid!) {
		user: user_by_pk(id: $id) {
			password
			username
		}
	}
`

export const GET_USER_INFO_QUERY = gql`
	query GetUserInfo($id: uuid!) {
		user: user_by_pk(id: $id) {
			username
			email
			createdAt
			provider
		}
	}
`
