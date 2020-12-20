import { useEffect, useState } from 'react'
import useSnippets from '../hooks/useSnippets'
import SnippetCard from "./SnippetCard"
import {  Skeleton } from "./Skeleton"
import { IconButton } from "../components/Button"
import styled from 'styled-components'

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
			if( document.documentElement.scrollTop > 0)
				setScrolled(true)
			else 
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

const SnippetsGrid = styled.div`
	width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

export default function Snippets({ query, variables, fetcher }) {
    const { data, loading, setSize, noResults } = useSnippets(query, variables, fetcher)

    return (
        <>
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

        <ScrollToTopButton/>
        </>
    )
}
