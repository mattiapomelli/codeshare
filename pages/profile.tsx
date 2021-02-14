import { useState, LiHTMLAttributes } from 'react'
import { useSession } from 'next-auth/client'
import styled, { css } from 'styled-components'
import { H2, Label } from '@/components/Typography'
import Snippets from '@/components/Snippets'
import withAuth from '@/hocs/withAuth'
import {
	GET_USER_SNIPPETS_QUERY,
	GET_LIKED_SNIPPETS_QUERY,
	GET_USER_SNIPPET_COUNT,
	GET_LIKED_SNIPPETS_COUNT,
} from '@/graphql/queries'
import useSWR from 'swr'
import PageHead from '@/components/PageHead'
import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Link from 'next/link'
import { authFetcher } from '@/graphql/client'
import { IconButton } from '@/components/Icon'
import useSnippets from '@/hooks/use-snippets'
import DashboardLayout from '@/layouts/DashboardLayout'

const Tab = styled.li<{ active: boolean }>`
	display: inline-block;
	padding: 0.6rem 1rem 0.6rem 0;
	margin-right: 1rem;
	cursor: pointer;
	${(props) =>
		props.active
			? css`
					border-bottom: 3px solid;
					border-image-slice: 1;
					border-image-source: ${(props) => props.theme.colors.primary};
					// needed for safari bug that keeps all borders
					border-left: 0px;
					border-right: 0px;
					border-top: 0px;
			  `
			: css`
					${Label} {
						color: ${(props) => props.theme.colors.secondaryText};
					}
					&:hover {
						${Label} {
							color: ${(props) => props.theme.colors.text};
						}
					}
			  `}
`

const Tag = styled.span`
	background: ${(props) => props.theme.colors.primary};
	border-radius: ${(props) => props.theme.borderRadius};
	padding: 0.1rem 0.5rem;
	margin-left: 1rem;
	font-size: 0.9rem;
`

interface TabProps extends LiHTMLAttributes<HTMLLIElement> {
	count: number
	active: boolean
}

const TabItem = ({ children, count, active, ...rest }: TabProps) => {
	return (
		<Tab active={active} {...rest}>
			<Label as="span" inline>
				{children}
			</Label>
			<Tag>{count}</Tag>
		</Tab>
	)
}

const countFetcher = async (query, userId) =>
	authFetcher(query, { userId }).then((res) => {
		return res.result.aggregate.count
	})

const ProfilePage = () => {
	const [option, setOption] = useState('snippets')
	const [session] = useSession()
	const { data: snippetsCount } = useSWR(
		[GET_USER_SNIPPET_COUNT, session.user.id],
		countFetcher,
		{
			revalidateOnFocus: false,
		}
	)
	const { data: likedCount } = useSWR(
		[GET_LIKED_SNIPPETS_COUNT, session.user.id],
		countFetcher,
		{
			revalidateOnFocus: false,
		}
	)
	const { data, loading, noResults } = useSnippets(
		option === 'snippets' ? GET_USER_SNIPPETS_QUERY : GET_LIKED_SNIPPETS_QUERY,
		{ userId: session.user.id },
		authFetcher
	)

	return (
		<>
			<PageHead title={`${session.user.username} – Codeshare`} />

			<Flex v="center" h="space-between" flexWrap="wrap">
				{session && <H2 overflowWrap>{session.user.username}</H2>}
				<Link href="/account">
					<span>
						<IconButton icon="settings" />
					</span>
				</Link>
			</Flex>

			<TabItem
				count={snippetsCount !== undefined ? snippetsCount : '-'}
				active={option === 'snippets'}
				onClick={() => setOption('snippets')}
			>
				Snippets
			</TabItem>
			<TabItem
				count={likedCount !== undefined ? likedCount : '-'}
				active={option === 'liked'}
				onClick={() => setOption('liked')}
			>
				Liked
			</TabItem>

			<Snippets data={data} loading={loading} noResults={noResults}>
				{option === 'snippets' ? (
					<>
						<div>You haven't created any snippets yet</div>
						<Link href="/editor">
							<Button variant="primary">Create your first snippet</Button>
						</Link>
					</>
				) : (
					"You don't have any liked snippets"
				)}
			</Snippets>
		</>
	)
}

ProfilePage.layout = DashboardLayout

export default withAuth(ProfilePage)
