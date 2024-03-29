import { gql } from 'graphql-request'

export const GET_LATEST_SNIPPETS_QUERY = gql`
  query GetLatestSnippetsQuery(
    $programmingLang: String
    $limit: Int!
    $offset: Int!
    $userId: uuid
    $isAuth: Boolean!
  ) {
    snippets: snippet(
      where: { programmingLang: { _eq: $programmingLang } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
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
      likes(where: { userId: { _eq: $userId } }) @include(if: $isAuth) {
        createdAt
      }
      user {
        username
      }
    }
  }
`

export const SEARCH_SNIPPETS_QUERY = gql`
  query SearchSnippetsQuery(
    $search: String
    $programmingLang: String
    $limit: Int!
    $offset: Int!
    $userId: uuid
    $isAuth: Boolean!
  ) {
    snippets: search_snippet(
      args: { search: $search }
      where: { programmingLang: { _eq: $programmingLang } }
      limit: $limit
      offset: $offset
    ) {
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
      likes(where: { userId: { _eq: $userId } }) @include(if: $isAuth) {
        createdAt
      }
      user {
        username
      }
    }
  }
`

export const GET_SINGLE_SNIPPET_QUERY = gql`
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
      likes(where: { userId: { _eq: $userId } }) @include(if: $isAuth) {
        createdAt
      }
      user {
        username
      }
    }
  }
`

export const GET_USER_SNIPPETS_QUERY = gql`
  query GetUserSnippets($userId: uuid!, $limit: Int!, $offset: Int!) {
    snippets: snippet(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      code
      description
      id
      title
      programmingLang
      likes(where: { userId: { _eq: $userId } }) {
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

export const GET_LIKED_SNIPPETS_QUERY = gql`
  query GetLikedSnippets($userId: uuid!, $limit: Int!, $offset: Int!) {
    snippets: snippet(
      where: { likes: { userId: { _in: [$userId] } } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
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

export const GET_USER_SNIPPET_COUNT = gql`
  query CountUserSnippets($userId: uuid!) {
    result: snippet_aggregate(where: { userId: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
  }
`

export const GET_LIKED_SNIPPETS_COUNT = gql`
  query CountLikedSnippets($userId: uuid!) {
    result: snippet_aggregate(
      where: { likes: { userId: { _in: [$userId] } } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const GET_SNIPPET_INFO = gql`
  query SingleSnippetQuery($id: uuid!) {
    snippet: snippet_by_pk(id: $id) {
      code
      description
      programmingLang
      title
      user {
        username
      }
    }
  }
`
