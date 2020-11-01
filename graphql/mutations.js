import { gql } from '@apollo/client'

export const CREATE_SNIPPET_MUTATION = gql`
    mutation MyMutation ($code: String!, $description: String, $programmingLang: String!, $title: String!, $userId: uuid!){
        insert_snippet(objects: {code: $code, description: $description, programmingLang: $programmingLang, title: $title, userId: $userId}) {
            returning {
                title
            }
        }
    }
`