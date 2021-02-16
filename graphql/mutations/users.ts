import { gql } from 'graphql-request'

export const CREATE_USER_MUTATION = gql`
	mutation CreateUserMutation(
		$username: String!
		$email: String!
		$password: String!
	) {
		user: insert_user_one(
			object: { email: $email, username: $username, password: $password }
		) {
			id
			createdAt
		}
	}
`

export const CREATE_USER_FROM_GITHUB_MUTATION = gql`
	mutation CreateUserFromGithubMutation(
		$username: String!
		$email: String!
		$password: String
		$provider: String
	) {
		user: insert_user_one(
			object: {
				email: $email
				username: $username
				password: $password
				provider: $provider
				verificated: true
			}
		) {
			id
			createdAt
		}
	}
`

export const MODIFY_USER_PASSWORD = gql`
	mutation ModifyUserPassword($id: uuid!, $password: String!) {
		update_user(where: { id: { _eq: $id } }, _set: { password: $password }) {
			affected_rows
		}
	}
`

export const CONFIRM_USER_EMAIL = gql`
	mutation ConfirmUserEmail($id: uuid!) {
		user: update_user_by_pk(
			pk_columns: { id: $id }
			_set: { verificated: true }
		) {
			verificated
		}
	}
`
