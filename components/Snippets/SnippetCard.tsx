import { FunctionComponent } from 'react'
import { CodeBlock } from '@/components/Code'
import Link from 'next/link'
import Flex from '@/components/Flex'
import Likes from './Likes'
import styled from 'styled-components'
import { useSession } from 'next-auth/client'
import SnippetActions from './SnippetActions'

const SnippetInfo = styled(Flex)`
	padding: 0 20px;
`

const SnippetTitle = styled.div`
	flex: 1;
	min-width: 0;
	a {
		color: ${(props) => props.theme.colors.text};
		text-decoration: none;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: -7px;
		font-size: 1.2rem;
		letter-spacing: -0.7px;
		font-weight: 500;

		&:hover {
			color: #ccc;
		}
	}
	span {
		font-size: 0.8rem;
		font-weight: 300;
		opacity: 0.7;
	}
`

interface SnippetCardProps {
	code: string
	programmingLang: string
	title: string
	id: string
	likesNum: number
	liked: boolean
	user: { username: string }
}

const SnippetCard: FunctionComponent<SnippetCardProps> = ({
	code,
	programmingLang,
	title,
	id,
	likesNum,
	liked,
	user,
}) => {
	const [session] = useSession()

	return (
		<article>
			<CodeBlock
				codeString={code + '\n'}
				language={programmingLang}
				preview={true}
			/>
			<SnippetInfo h="space-between" v="center">
				<SnippetTitle>
					<Link href={`/snippet/${id}`}>
						<a>{title}</a>
					</Link>
					<span>{user.username}</span>
				</SnippetTitle>
				{session?.user.username === user.username && <SnippetActions id={id} />}
				<Likes isLiked={liked} count={likesNum} snippetId={id} />
			</SnippetInfo>
		</article>
	)
}

export default SnippetCard
