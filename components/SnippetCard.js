import { useState } from "react"
import CodeBlock from "./CodeBlock"
import Link from "next/link"
import { Flex } from "./elements/MainElements"
import { request, GraphQLClient } from "graphql-request"
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { useSession } from "next-auth/client"
import styled from "styled-components"
import { Icon } from "./Icon/Icon"

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL, {
    headers: {
        "x-hasura-admin-secret": "UNIMI2020"
    }
})

const SnippetInfo = styled(Flex)`
    padding: 0 20px;
`

const SnippetTitle = styled.div`
    flex: 1;
    min-width: 0;
    a {
        color: ${props => props.theme.colors.text};
        text-decoration: none;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: -7px;
        font-size: 1.2rem;
        letter-spacing: -0.7px;
        font-weight: 500;
    }
    span {
        font-size: 0.8rem;
        font-weight: 300;
        opacity: 0.7;
    }
`

const Likes = styled.div`
    display: inline-flex;
    align-items: center;
    margin-left: 10px;
`

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
            <CodeBlock codeString={code + "\n"} language={programmingLang} preview={true}/>
            <SnippetInfo h="space-between" v="center">
                <SnippetTitle>
                    <Link href={`/snippet/${id}`}>
                        <a>{title}</a>						
                    </Link>
                    <span>{user.username}</span>
                </SnippetTitle>
                <Likes>
                    <span>{likesCount}</span>
                    <Icon name="star" onClick={addLike}/>
                </Likes>
            </SnippetInfo>
        </article>
    )
}

export default SnippetCard