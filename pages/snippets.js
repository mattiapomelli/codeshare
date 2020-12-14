import { useEffect, useState } from 'react'
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import {  Skeleton } from "../components/Skeleton"
import Dropdown from "../components/Dropdown/Dropdown"
import useSnippets from '../hooks/useSnippets'
import { IconInput } from "../components/Input"
import { H1 } from '../components/Typography'
import styled from "styled-components"
import { IconButton } from "../components/Button"
import graphQLClientAdmin from '../graphql/client'
import { GET_PROGRAMMING_LANGS_QUERY } from '../graphql/queries'
import { likesCache } from '../utils/cache'

const SnippetsGrid = styled.div`
	width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 25px;
    margin-top: 2rem;
	
	@media ${props => props.theme.breakpoints.tablet} {
        grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
	}
`

const SnippetSkeleton = () => (
	<article>	
		<Skeleton h="280px"/>
		<div style={{marginLeft: "5px"}}>
			<Skeleton h="1rem" w="80%"/>
			<Skeleton h="0.8rem" w="50%"/>
		</div>		
	</article>
)

const ScrollButton = styled(IconButton)`
	position: fixed;
	bottom: 0.6rem;
	right: 0.6rem;
	animation: opacity 200ms;
`

const ScrollToTopButton = () => {
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		function checkScroll() {
			if( !scrolled && document.documentElement.scrollTop > 0)
				setScrolled(true)
			else if(scrolled)
				setScrolled(false)

		}
		window.addEventListener("scroll", checkScroll)
		return () => { window.removeEventListener('scroll', checkScroll)}
	}, [])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	return (
		<>{
			scrolled &&  
			<ScrollButton icon="arrowUp" type="primary" iconType="primary" small onClick={scrollToTop}/>
		}</>
	)
}

export default function Home({ langs }) {
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { data, loading, setSize, noResults } = useSnippets(activeLanguage, search)

	return (
		<>
			<H1>Snippets</H1>
			<button onClick={() => { console.log(likesCache)}}>cache</button>
			<IconInput
				placeholder="Search..."
				value={search}
				onChange={(e) => { setSearch(e.target.value)}}
				icon="search"
				style={{marginRight: '15px'}}
				minWidth="16rem"
				double={search.length > 0}
				secondIcon="cross"
			/>
			<Dropdown options={["All"].concat(langs)} onSelect={setActiveLanguage} value={activeLanguage} nullValue="All"/>
			<SnippetsGrid>
				{ noResults && <span style={{marginLeft: "10px"}}>No results</span>}
				{
					data.map((snippet) => (
						<SnippetCard {...snippet} key={snippet.id}/>
					))
				}
				{ loading &&
				[1, 2, 3, 4, 5, 6].map((key) => (
					<SnippetSkeleton key={key}/>
				))}
			</SnippetsGrid>
			<ScrollToTopButton/>
			<button onClick={() => setSize(size => size + 1)} id="loadMoreButton" style={{display: "none"}}>Load More</button>
		</>
	)
}

export async function getStaticProps() {
	const data = await graphQLClientAdmin.request(GET_PROGRAMMING_LANGS_QUERY)
	
	const langs = []
	data.langs.forEach(lang => {
		langs.push(lang.name)
	})

	return {
		props: { langs }
	}
}