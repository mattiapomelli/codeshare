import { useEffect } from 'react'
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import {  Skeleton } from "../components/Skeleton"
import Dropdown from "../components/Dropdown/Dropdown"
import useSnippets from '../hooks/useSnippets'
import { IconInput } from "../components/Input"
import { H1 } from '../components/Typography'
import styled from "styled-components"
import { cache } from 'swr'
import { likesCache } from '../utils/cache'

const languages = ["All", "Java", "JavaScript", "CSS", "HTML", "SQL", "C"]

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

export default function Home() {
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { data, loading, setSize, noResults } = useSnippets(activeLanguage, search)

	useEffect(() => {
		cache.clear();
	}, [search])

	// useEffect(() => {
	// 	return () => { cache.clear(); }
	// }, [])

	return (
		<>
			<H1>Snippets</H1>
			<button onClick={() => { console.log(likesCache)}}>cache</button>
			<button onClick={() => { cache.clear(); }}>clear</button>
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
			<Dropdown options={languages} onSelect={setActiveLanguage} value={activeLanguage} nullValue="All"/>
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
			<button onClick={() => setSize(size => size + 1)} id="loadMoreButton" style={{display: "none"}}>Load More</button>
		</>
	)
}
