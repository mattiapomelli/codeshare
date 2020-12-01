import { useState } from "react"
import CodeBlock from "./CodeBlock"
import Link from "next/link"
import { SnippetTitle } from "./elements/MainElements"
import { request, GraphQLClient } from "graphql-request"
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { useSession } from "next-auth/client"

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL, {
    headers: {
        "x-hasura-admin-secret": "UNIMI2020"
    }
})

const SnippetCard = ({ code, programmingLang, title, id, likes_aggregate, likes, user }) => {
    const [session] = useSession()
    const [likesCount, setLikesCount] = useState(() => {
        return likes_aggregate ? likes_aggregate.aggregate.count : null
    })
    const [isLiked, setIsLiked] = useState(() => {
        return likes ? likes.length > 0 : false      // if current logged user has liked the snippet likes.length will be greater than 0
    })

    const addLike = () => {
        const query = isLiked ? REMOVE_LIKE_MUTATION : ADD_LIKE_MUTATION
        const increment = isLiked ? -1 : 1
        request( query, {
            userId: session.user.id,
            snippetId: id
        }).then(data => {
            if(data.action.affected_rows == 1) {
                setIsLiked(isLiked => !isLiked);
                setLikesCount(prevCount => prevCount + increment)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <article>
            <CodeBlock codeString={code + "\n"} language={programmingLang}/>
            <SnippetTitle h="space-between" v="center">
                <div className="info">
                    <Link href="/">
                        <h5 className="title">{title}</h5>						
                    </Link>
                    <span className="user">{user.username}</span>
                </div>
                <div className="likes">
                    <span>{likesCount}</span>
                    <span className="material-icons" onClick={addLike}>flash_on</span>
                </div>
            </SnippetTitle>
        </article>
    )
}

export default SnippetCard