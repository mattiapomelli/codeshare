import { useState } from 'react'
import { useRouter } from "next/router"
import CodeBlock from "../../components/CodeBlock"
import { H2, Label } from '../../components/Typography'
import Flex from '../../components/Flex'
import Likes from '../../components/Likes'
import { GET_SINGLE_SNIPPET_QUERY } from "../../graphql/queries"
import styled from 'styled-components'
import { Skeleton } from '../../components/Skeleton'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'
import request from "graphql-request"
import SnippetCard from '../../components/SnippetCard'
import { cache } from 'swr'
import { likesCache } from '../../utils/cache'

const Description = styled.pre`
    font-size: 0.9rem;
    font-family: inherit;
    font-weight: 300;
    margin-left: 5px;
    padding-left: 1.5rem;
    color: #ccc;
    border-left: 1px solid ${props => props.theme.colors.secondaryText};
`

const Info = styled(Flex)`
    margin-bottom: 1rem;
    margin-left: 5px;
    span {
        font-weight: 300;
        color: #ccc;
    }
`

const PageSkeleton = () => (
	<article>	
		<div style={{marginBottom: '1rem', marginTop: '0.5rem'}}>
			<Skeleton h="3rem" w="40%" style={{marginBottom: '0.7rem'}}/>
			<Skeleton h="1.5rem"/>
		</div>		
		<Skeleton h="280px"/>
	</article>
)

const Snippet = ({ code, programmingLang, title, id, likesNum, liked, user, createdAt, description, mutate }) => {
    const [likesCount, setLikesCount] = useState(likesNum)
    const [isLiked, setIsLiked] = useState(liked)

    return (
        <>
            <H2>{title}</H2>
            <Info h="space-between" v="center">
                <span>{user.username} &middot; {createdAt.slice(0, 10)}</span>
                <Likes
                    isLiked={isLiked}
                    count={likesCount}
                    setIsLiked={setIsLiked}
                    setCount={setLikesCount}
                    snippetId={id}
                    secondMutate={mutate}
                />
            </Info>
            <CodeBlock codeString={code + "\n"} language={programmingLang}/>    
            <Label style={{marginTop: "1rem"}}>Description</Label>
            <Description>
                {description}
            </Description>
        </>
    )
}

const fetcher = (query, snippetId, userId) => request(process.env.NEXT_PUBLIC_HASURA_URL, query, {
    id: snippetId,
    userId: userId,
	isAuth: userId ? true : false
}).then(data => {
	const { snippet } = data
    snippet.likesNum = snippet.likes_aggregate.aggregate.count
    snippet.liked =  snippet.likes ? snippet.likes.length > 0 : false
    delete snippet.likes_aggregate
    delete snippet.likes
    return snippet
})

const SnippetPage = () => {
    const router = useRouter()
    const [session] = useSession()
    const userId = session ? session.user.id : null
    const { data } = useSWR([GET_SINGLE_SNIPPET_QUERY, router.query.id, userId], fetcher, {
        revalidateOnMount: true
    })

    if(!data) return <PageSkeleton/>

    return (
        <>
        <button onClick={() => { console.log(likesCache)}}>cache</button>
        <Snippet {...data}/>
        </>
    )
}

export default SnippetPage
