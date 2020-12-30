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
import processSnippet from '../../utils/processSnippet'
import PageHead from '../../components/PageHead'

const Description = styled.pre`
    white-space: pre-wrap;
    font-size: 0.9rem;
    font-family: inherit;
    font-weight: 300;
    margin-left: 5px;
    padding-left: 1.5rem;
    color: #ccc;
    border-left: 3px solid ${props => props.theme.colors.secondaryText};
    /* border-right: 3px solid ${props => props.theme.colors.secondaryText}; */
    /* background-color: ${props => props.theme.colors.sidebar}; */
    /* border-radius: ${props => props.theme.borderRadius}; */
`

const Info = styled(Flex)`
    margin-bottom: 1rem;
    margin-left: 5px;
    span {
        font-weight: 300;
        color: #ccc;
    }
`

// const CategoryTag = styled.span`
//     background: ${props => props.theme.colors.code[props.language]};
//     border-radius: ${props => props.theme.borderRadius};
//     font-family: monospace;
//     text-transform: uppercase;
//     padding: 0.3rem 0.8rem;
//     display: inline-block;
//     font-size: 0.9rem;
//     color: ${props => props.theme.colors.background} !important;
// `

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
    
    return (
        <>  

            <H2 wrap>{title}</H2>
            {/* <CategoryTag language={programmingLang.toLowerCase()}>{programmingLang}</CategoryTag>s */}
            <Info h="space-between" v="center">
                <span>{user.username} &middot; {createdAt.slice(0, 10)}
                </span>
                <Likes
                    isLiked={liked}
                    count={likesNum}
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
    return processSnippet(snippet)
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
            <PageHead title={data.title}/>
            <Snippet {...data}/>
        </>
    )
}

export default SnippetPage
