import { useState } from "react"
import CodeBlock from "./CodeBlock"
import Link from "next/link"
import Flex from "./Flex"
import Likes from './Likes'
import styled from "styled-components"

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


const SnippetCard = ({ code, programmingLang, title, id, likesNum, liked, user, mutate }) => {
    const [likesCount, setLikesCount] = useState(likesNum)
    const [isLiked, setIsLiked] = useState(liked)

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
                <Likes
                    isLiked={isLiked}
                    count={likesCount}
                    setIsLiked={setIsLiked}
                    setCount={setLikesCount}
                    snippetId={id}
                    mutate={mutate}
                />
            </SnippetInfo>
        </article>
    )
}

export default SnippetCard