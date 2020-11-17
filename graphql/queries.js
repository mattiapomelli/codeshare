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
