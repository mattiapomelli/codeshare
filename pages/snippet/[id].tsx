import { useRouter } from 'next/router'
import { CodeBlock } from '../../components/Code'
import { H2, Label } from '../../components/Typography'
import Flex from '../../components/Flex'
import { Likes, SnippetActions } from '../../components/Snippets'
import { GET_SINGLE_SNIPPET_QUERY } from '../../graphql/queries'
import styled from 'styled-components'
import { Skeleton } from '../../components/Skeleton'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'
import request from 'graphql-request'
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
		flex: 1;
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
		<div style={{ marginBottom: '1rem', marginTop: '0.5rem' }}>
			<Skeleton h="2rem" w="40%" style={{ marginBottom: '0.7rem' }} />
			<Skeleton h="1.4rem" />
		</div>
		<Skeleton h="280px" />
	</article>
)

interface Props {
	code: string
	programmingLang: string
	title: string
	id: string
	likesNum: number
	liked: boolean
	user: { username: string }
	createdAt: string
	description: string
}

const Snippet = ({
	code,
	programmingLang,
	title,
	id,
	likesNum,
	liked,
	user,
	createdAt,
	description,
}: Props) => {
	const [session] = useSession()

	return (
		<>
			<H2 overflowWrap>{title}</H2>
			{/* <CategoryTag language={programmingLang.toLowerCase()}>{programmingLang}</CategoryTag>s */}
			<Info h="space-between" v="center" flexWrap="wrap">
				<span>
					{user.username} &middot; {createdAt.slice(0, 10)}
				</span>
				<Flex v="center">
					{session?.user.username === user.username && (
						<SnippetActions id={id} />
					)}
					<Likes isLiked={liked} count={likesNum} snippetId={id} />
				</Flex>
			</Info>
			<CodeBlock codeString={code + '\n'} language={programmingLang} />
			<Label style={{ marginTop: '1rem' }}>Description</Label>
			<Description>{description}</Description>
		</>
	)
}

const fetcher = (query, snippetId, userId) =>
	request(process.env.NEXT_PUBLIC_HASURA_URL, query, {
		id: snippetId,
		userId: userId,
		isAuth: userId ? true : false,
	}).then(data => {
		const { snippet } = data
		return processSnippet(snippet)
	})

const SnippetPage = () => {
	const router = useRouter()
	const [session] = useSession()
	const userId = session ? session.user.id : null
	const { data } = useSWR(
		[GET_SINGLE_SNIPPET_QUERY, router.query.id, userId],
		fetcher,
		{
			revalidateOnMount: true,
		}
	)

	if (!data) return <PageSkeleton />

	return (
		<>
			<PageHead title={data.title} />
			<Snippet {...data} />
		</>
	)
}

export default SnippetPage
