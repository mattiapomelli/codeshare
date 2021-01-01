import { gql } from 'graphql-request'

export const CREATE_SNIPPET_MUTATION = gql`
    mutation MyMutation ($code: String!, $description: String!, $programmingLang: String!, $title: String!){
        insert_snippet(objects: {code: $code, description: $description, programmingLang: $programmingLang, title: $title}) {
            returning {
                title
            }
        }
    }
`;

export const CREATE_USER_MUTATION = gql`
  mutation($username:String!, $email:String!,$password:String!){
    user: insert_user_one(object:{
      email:$email
      username:$username
      password:$password
    })
    {
      id
      createdAt
    }
  } 
`;

export const CREATE_USER_FROM_GITHUB_MUTATION = gql`
  mutation($username:String!, $email:String!,$password:String, $provider: String){
    user: insert_user_one(object:{
        email:$email
        username:$username
        password:$password
        provider:$provider
        verificated: true
    })
        {
            id
            createdAt
        }
    }
`

export const ADD_LIKE_MUTATION = `
  mutation AddLikeMutation($userId: uuid!, $snippetId: uuid!) {
    action: insert_like(objects: {userId: $userId, snippetId: $snippetId}) {
      affected_rows
    }
  }
`

export const REMOVE_LIKE_MUTATION = `
  mutation RemoveLikeMutation($userId: uuid!, $snippetId: uuid!) {
    action: delete_like(where: {snippetId: {_eq: $snippetId}, userId: {_eq: $userId}}) {
      affected_rows
    }
  }
`

export const MODIFY_USER_PASSWORD = `
  mutation ModifyUserPassword($id: uuid!,$password:String!) {
    update_user(where: {id: {_eq: $id}}, _set: {password: $password}){
      affected_rows
    }
  }
`

export const CONFIRM_USER_EMAIL = `
mutation ConfirmUserEmail($id: uuid!) {
  update_user_by_pk(pk_columns: {id: $id}, _set: {verificated: true}){
    verificated
  }
}
`

export const DELETE_SNIPPET = `
mutation DeleteSnippet($id: uuid!) {
  delete_snippet(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
`

export const UPDATE_SNIPPET_MUTATION = `
mutation UpdateSnippetMutation($id: uuid!, $code: String!, $description: String, $title: String!) {
  update_snippet_by_pk(pk_columns: {id: $id}, _set: {code: $code, description: $description, title: $title}) {
    id
  }
}
`