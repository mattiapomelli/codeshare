import { gql } from '@apollo/client'

export const GET_LATEST_SNIPPETS_QUERY = gql`
  query LatestSnippetsQuery($programmingLang: String) {
    snippets: snippet(where: {programmingLang: {_eq: $programmingLang}}, order_by: {createdAt: desc}) {
      title
      code
      createdAt
      programmingLang
      id
    }
  }

`

export const GET_FILTERED_SNIPPETS = gql`
  query SearchSnippetsQuery ($search: String!, , $programmingLang: String){
    snippets: search_snippet(args: {search: $search}, where: {programmingLang: {_eq: $programmingLang}}) {
      title
      code
      createdAt
      programmingLang
      id
    }
  }
`

