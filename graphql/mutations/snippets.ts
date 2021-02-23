import { gql } from 'graphql-request'

export const CREATE_SNIPPET_MUTATION = gql`
  mutation CreateSnippetMutation(
    $code: String!
    $description: String!
    $programmingLang: String!
    $title: String!
  ) {
    insert_snippet(
      objects: {
        code: $code
        description: $description
        programmingLang: $programmingLang
        title: $title
      }
    ) {
      returning {
        title
      }
    }
  }
`

export const ADD_LIKE_MUTATION = gql`
  mutation AddLikeMutation($userId: uuid!, $snippetId: uuid!) {
    action: insert_like(objects: { userId: $userId, snippetId: $snippetId }) {
      affected_rows
    }
  }
`

export const REMOVE_LIKE_MUTATION = gql`
  mutation RemoveLikeMutation($userId: uuid!, $snippetId: uuid!) {
    action: delete_like(
      where: { snippetId: { _eq: $snippetId }, userId: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`

export const DELETE_SNIPPET = gql`
  mutation DeleteSnippet($id: uuid!) {
    delete_snippet(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

export const UPDATE_SNIPPET_MUTATION = gql`
  mutation UpdateSnippetMutation(
    $id: uuid!
    $code: String!
    $description: String!
    $title: String!
  ) {
    update_snippet_by_pk(
      pk_columns: { id: $id }
      _set: { code: $code, description: $description, title: $title }
    ) {
      id
    }
  }
`
