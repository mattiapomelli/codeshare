import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { CodeBlock } from '@/components/Code'
import { H2, Label } from '@/components/Typography'
import Flex from '@/components/Flex'
import { Likes, SnippetActions } from '@/components/Snippets'
import { GET_SINGLE_SNIPPET_QUERY } from '@/graphql/queries'
import styled from 'styled-components'
import { Skeleton } from '@/components/Skeleton'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'
import processSnippet from '@/utils/process-snippet'
import PageHead from '@/components/PageHead'
import { Snippet } from 'types'
import { fetcher } from '@/graphql/client'
import DashboardLayout from '@/layouts/DashboardLayout'

const Description = styled.pre`
	white-space: pre-wrap;
	font-size: 0.9rem;
	font-family: inherit;
	font-weight: 300;
	margin-left: 5px;
	padding-left: 1.5rem;
	color: #ccc;
	border-left: 3px solid ${(props) => props.theme.colors.secondaryText};
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

const PageSkeleton = () => (
	<article>
		<div style={{ marginBottom: '1rem', marginTop: '0.5rem' }}>
			<Skeleton h="2rem" w="40%" style={{ marginBottom: '0.7rem' }} />
			<Skeleton h="1.4rem" />
		</div>
		<Skeleton h="280px" />
	</article>
)

const SnippetContent: FunctionComponent<Snippet> = ({
	code,
	programmingLang,
	title,
	id,
	likesNum,
	liked,
	user,
	createdAt,
	description,
}) => {
	const [session] = useSession()

	return (
		<article>
			<H2 overflowWrap>{title}</H2>
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
		</article>
	)
}

const snippetFetcher = (query, snippetId, userId) =>
	fetcher(query, {
		id: snippetId,
		userId: userId,
		isAuth: userId ? true : false,
	}).then((data) => processSnippet(data.snippet))

const SnippetPage = () => {
	const router = useRouter()
	const [session] = useSession()
	const userId = session ? session.user.id : null
	const { data } = useSWR(
		[GET_SINGLE_SNIPPET_QUERY, router.query.id, userId],
		snippetFetcher
	)

	if (!data) return <PageSkeleton />

	return (
		<>
			<PageHead title={data.title} />
			<SnippetContent {...data} />
		</>
	)
}

SnippetPage.layout = DashboardLayout

export default SnippetPage
