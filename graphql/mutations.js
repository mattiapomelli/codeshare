import { gql } from '@apollo/client'

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