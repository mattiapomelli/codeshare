import { useEffect, useState } from 'react'
import useSnippets from '../../hooks/useSnippets'
import SnippetCard from './SnippetCard'
import { Skeleton } from '../Skeleton'
import Icon from '../Icon'
import Flex from '../Flex'
import styled from 'styled-components'

const ScrollButton = styled.button`
	border: none;
	outline: none;
	font-size: 0.8rem;
	cursor: pointer;
	text-align: center;
	padding: 0.5em;
	border-radius: 1.2em;
	line-height: 1;
	position: fixed;
	bottom: 0.6rem;
	right: 0.6rem;
	animation: opacity 200ms;
	background: ${props => props.theme.colors.primary};
`

const ScrollToTopButton = () => {
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		function checkScroll() {
			if (document.documentElement.scrollTop > 0) setScrolled(true)
			else setScrolled(false)
		}
		window.addEventListener('scroll', checkScroll)
		return () => {
			window.removeEventListener('scroll', checkScroll)
		}
	}, [])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<>
			{scrolled && (
				<ScrollButton onClick={scrollToTop}>
					<Icon icon="arrowUp" variant="primary" />
				</ScrollButton>
			)}
		</>
	)
}

const SnippetsGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-auto-rows: auto;
	grid-gap: 25px;
	margin-top: 2rem;

	@media only screen and (min-width: 400px) {
		grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
	}

	@media ${props => props.theme.breakpoints.tablet} {
		grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
	}
`

const SnippetSkeleton = () => (
	<article>
		<Skeleton h="280px" />
		<div style={{ marginLeft: '5px' }}>
			<Skeleton h="1rem" w="80%" />
			<Skeleton h="0.8rem" w="50%" />
		</div>
	</article>
)

const NoResultsContainer = styled(Flex)`
	font-size: 1.4rem;
	margin-top: 3rem;
	text-align: center;
	> * {
		margin-bottom: 1rem;
	}
`

interface Props {
	children?: React.ReactNode
	query: string
	variables: {
		[key: string]: string
	}
	/* eslint-disable @typescript-eslint/no-explicit-any */
	fetcher: (...args: any) => any
}

export default function Snippets({
	children,
	query,
	variables,
	fetcher,
}: Props) {
	const { data, loading, setSize, noResults } = useSnippets(
		query,
		variables,
		fetcher
	)

	return (
		<>
			{noResults && (
				<NoResultsContainer dir="column" v="center">
					{children || 'No results found'}
				</NoResultsContainer>
			)}
			<SnippetsGrid>
				{data.map(snippet => (
					<SnippetCard {...snippet} key={snippet.id} />
				))}
				{loading &&
					[1, 2, 3, 4, 5, 6].map(key => <SnippetSkeleton key={key} />)}
			</SnippetsGrid>
			<button
				onClick={() => setSize(size => size + 1)}
				id="loadMoreButton"
				style={{ display: 'none' }}
			>
				Load More
			</button>

			<ScrollToTopButton />
		</>
	)
}
