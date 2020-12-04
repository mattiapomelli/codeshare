import { gql } from 'graphql-request'

export const CREATE_SNIPPET_MUTATION = gql`
    mutation MyMutation ($code: String!, $description: String, $programmingLang: String!, $title: String!, $userId: uuid!){
        insert_snippet(objects: {code: $code, description: $description, programmingLang: $programmingLang, title: $title, userId: $userId}) {
            returning {
                title
            }
        }
    }
`;

export const CREATE_USER_REGISTRATION = gql`
mutation($username:String!, $email:String!,$password:String!){
  insert_user_one(object:{
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