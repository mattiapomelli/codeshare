function processSnippet(snippet) {
    snippet.likesNum = snippet.likes_aggregate.aggregate.count
    snippet.liked =  snippet.likes ? snippet.likes.length > 0 : false
    delete snippet.likes_aggregate
    delete snippet.likes
    return snippet
}

export default processSnippet