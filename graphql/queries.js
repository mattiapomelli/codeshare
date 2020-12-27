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

export const GET_LATEST_SNIPPETS_QUERY = `
	query SearchSnippetsQuery( $programmingLang: String, $limit: Int!, $offset: Int!, $userId: uuid, $isAuth: Boolean!) {
	snippets: snippet( where: {programmingLang: {_eq: $programmingLang}}, order_by: {createdAt: desc}, limit: $limit, offset: $offset) {
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

export const SEARCH_SNIPPETS_QUERY = `
	query SearchSnippetsQuery($search: String, $programmingLang: String, $limit: Int!, $offset: Int!, $userId: uuid, $isAuth: Boolean!) {
	snippets: search_snippet(args: {search: $search}, where: {programmingLang: {_eq: $programmingLang}}, limit: $limit, offset: $offset) {
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

export const GET_USER_BY_EMAIL_QUERY = `
	query GetUserByEmail ($email: String!) {
		user(where: {email: {_eq: $email}}) {
			id
			verificated
			password
			email
			username
			provider
		}
	}
`

export const GET_USER_BY_USERNAME_QUERY = `
	query GetUserByUsername ($username: String!) {
		user(where: {username: {_eq: $username}}) {
			username
		}
	}
`

export const GET_PROGRAMMING_LANGS_QUERY = `
	query ProgrammingLangsQuery {
		langs: programming_lang {
			name
		}
	}
`

export const GET_USER_SNIPPETS_QUERY = `
	query GetUserSnippets($userId: uuid!, $limit: Int!, $offset: Int!) {
		snippets: snippet(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}, limit: $limit, offset: $offset) {
			code
			description
			id
			title
			programmingLang
			likes {
				createdAt
			}
			likes_aggregate {
				aggregate {
					count
				}
			}
			user {
				username
			}
		}
	}
`

export const GET_LIKED_SNIPPETS_QUERY = `
	query GetLikedSnippets($userId: uuid!, $limit: Int!, $offset: Int!) {
		snippets: snippet(where: {likes: {userId: {_in: [$userId]}}}, order_by: {createdAt: desc}, limit: $limit, offset: $offset) {
			code
			description
			id
			title
			programmingLang
			likes {
				createdAt
			}
			likes_aggregate {
				aggregate {
					count
				}
			}
			user {
				username
			}
		}
	}
  
`

export const GET_USER_SNIPPET_COUNT = `
	query CountUserSnippets($userId: uuid!) {
		result: snippet_aggregate(where: {userId: {_eq: $userId}}) {
			aggregate {
				count
			}
		}
	}
`

export const GET_LIKED_SNIPPETS_COUNT = `
	query CountLikedSnippets($userId: uuid!) {
		result: snippet_aggregate(where: {likes: {userId: {_in: [$userId]}}}) {
			aggregate {
				count
			}
		}
	}
`

export const GET_USER_BY_ID_QUERY = `
	query FetUserById($id: uuid!) {
		user: user_by_pk(id: $id) {
			password
			username
		}
	}  
`

export const GET_USER_INFO_QUERY = `
	query GetuserInfo($id: uuid!) {
		user: user_by_pk(id: $id) {
			username
			email
			createdAt
		}
	}
`