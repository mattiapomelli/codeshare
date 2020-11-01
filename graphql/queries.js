import { gql } from '@apollo/client'

export const GET_ALL_SNIPPETS_QUERY = gql`
  query MyQuery {
  snippet {
    userId
		title
    code
    createdAt
    description
    programmingLang
    id
  }
}
`