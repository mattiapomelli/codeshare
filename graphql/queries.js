import { gql } from '@apollo/client'


//query MyQuery($limit:Int!,$offset:Int!) {
export const GET_ALL_SNIPPETS_QUERY = gql`
query MyQuery($limit:Int!,$offset:Int!) {
  snippet(limit: $limit, offset: $offset, order_by: {createdAt: desc}) {
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
