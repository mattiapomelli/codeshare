import { gql } from 'graphql-request'

export const GET_PROGRAMMING_LANGS_QUERY = gql`
  query ProgrammingLangsQuery {
    langs: programming_lang {
      name
    }
  }
`
