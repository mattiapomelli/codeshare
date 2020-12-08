export const GET_FILTERED_SNIPPETS_QUERY = `
	query SearchSnippetsQuery($search: String, $programmingLang: String, $order: order_by, $limit: Int!, $offset: Int!, $userId: uuid, $isAuth: Boolean!) {
	snippets: search_snippet(args: {search: $search}, where: {programmingLang: {_eq: $programmingLang}}, order_by: {createdAt: $order}, limit: $limit, offset: $offset) {
		title
		code
		createdAt
		programmingLang
		id
		likes_aggregate {
			aggregate {
				count
			}
		}
		likes(where: {userId: {_eq: $userId}}) @include(if: $isAuth){
			createdAt
		}
		user {
			username
		}
	  }
	}
`

export const GET_ALL_SNIPPETS_ID_QUERY = `
	query SnippetsIdQuery {
		snippets: snippet {
			id
		}
	}
  `

export const GET_SINGLE_SNIPPET_QUERY = `
	query SingleSnippetQuery($id: uuid!, $userId: uuid, $isAuth: Boolean!) {
	  	snippet: snippet_by_pk(id: $id) {
			code
			createdAt
			description
			id
			programmingLang
			title
			likes_aggregate {
				aggregate {
					count
				}
			}
			likes(where: {userId: {_eq: $userId}}) @include(if: $isAuth){
				createdAt
			}
			user {
				username
			}
		}
	}
`

export const GET_SNIPPET_LIKES = `
	query GetSnippetLikes($id: uuid!, $userId: uuid, $isAuth: Boolean!) {
		snippet: snippet_by_pk(id: $id) {
			likes_aggregate {
				aggregate {
					count
				}
			}
			likes(where: {userId: {_eq: $userId}}) @include(if: $isAuth){
				createdAt
			}
		}
	}
`
export const GET_USER_BY_EMAIL_QUERY = `
	query GetUserByEmail ($email: String!) {
		user(where: {email: {_eq: $email}}) {
			id
			verificated
			password
			email
			username
		}
	}
`