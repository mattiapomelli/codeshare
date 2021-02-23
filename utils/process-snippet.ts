import { RawSnippet, Snippet } from 'types'

function processSnippet(snippet: RawSnippet): Snippet {
  const {
    likes_aggregate: {
      aggregate: { count },
    },
    likes,
    ...rest
  } = snippet

  const newSnippet = {
    ...rest,
    likesNum: count,
    liked: likes ? likes.length > 0 : false,
  }

  return newSnippet
}

export default processSnippet
