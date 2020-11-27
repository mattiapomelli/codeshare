import { useState, useEffect } from "react"
import CodeBlock from "./CodeBlock"
import Link from "next/link"
import copyToClipboard from "../utils/copy-to-clipboard"
import { Container, Header, Body, ScrollWrapper, CopyButton, Tooltip, Footer, LikeContainer } from "./elements/SnippetElements"
import { request, GraphQLClient } from "graphql-request"
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { GET_SNIPPET_LIKES } from "../graphql/queries"
import { useSession } from "next-auth/client"
import useSWR from "swr"

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL, {
    headers: {
        "x-hasura-admin-secret": "UNIMI2020"
    }
})

const SnippetCard = ({ code, programmingLang, title, id, preview, likes_aggregate, likes, user }) => {
    const [session] = useSession()
    const [likesCount, setLikesCount] = useState(() => {
        return likes_aggregate ? likes_aggregate.aggregate.count : null
    })
    const [isLiked, setIsLiked] = useState(() => {
        return likes ? likes.length > 0 : false      // if current logged user has liked the snippet likes.length will be greater than 0
    })
    
    const userId = session ? session.user.id : null
    const { data, error } = useSWR(!preview ? [GET_SNIPPET_LIKES, id, userId] : null, (query, id) =>
        request(process.env.NEXT_PUBLIC_HASURA_URL, query, {
            id,
            userId,
            isAuth: userId ? true : false
        })
    );

    useEffect(() => {
        if(data) {
            const res = data.snippet.likes ? data.snippet.likes.length > 0 : false
            setIsLiked(res)
            setLikesCount(data.snippet.likes_aggregate.aggregate.count)
        }
    }, [data])

    const clickHandler = (e) => {
        e.preventDefault();
        copyToClipboard(code)
        let element = e.target
        element.innerHTML = `Copied <svg width="14.4" height="10.72" viewBox="0 0 90 67" fill="none">
        <path d="M14 21.5L3 33L36.5 63.5L87 14.5L76 3.5L36.5 42.5L14 21.5Z" fill="#6BD97C" stroke="black" stroke-width="4"/>
        </svg>`
        element.classList.add('copied')
        if (typeof window !== "undefined") {    // so it doesn't throw an error on build (is this really needed?) 
            window.setTimeout(() => {
                element.innerHTML = "Copy"
                element.classList.remove('copied')
            }, 2400)
        }
    }

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
        <Container>
            <Tooltip className={`${programmingLang.toLowerCase()}`}>{programmingLang}</Tooltip>
            { preview && <Link href={`/snippet/${id}`}><Header>{title}</Header></Link> }        
            <Body>
                <ScrollWrapper>
                    <CodeBlock codeString={code} language={programmingLang}/>
                </ScrollWrapper>
            </Body>
            <Footer>
                <LikeContainer>
                    <svg viewBox="0 0 107 107" fill="none" onClick={addLike} className={isLiked ? "filled" : "stroke"}>
                        <circle cx="53.5" cy="53.5" r="52" fill="white" stroke="#B80202" strokeWidth="5"/>
                    </svg>
                    {likesCount != null ? likesCount : "-"} - 
                    <span>
                        by {user.username}
                    </span>
                </LikeContainer>      
                <CopyButton onClick={clickHandler}>Copy</CopyButton>
            </Footer>
        </Container>
    )
}

export default SnippetCard