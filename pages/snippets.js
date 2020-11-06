import {  useRef, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_SNIPPETS_QUERY } from "../graphql/queries"
import scrolledToBottom from "../utils/scrolled-to-bottom"
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar } from "../components/elements/HomeElements"

export default function Home() {
	const offset = useRef(0)
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { loading, data, fetchMore } = useQuery(GET_ALL_SNIPPETS_QUERY, {
		variables: {
			offset: offset.current,
			limit: 6
		},
	})

	const languages = ["Java", "Javascript", "CSS", "HTML", "SQL", "C"]

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => { window.removeEventListener('scroll', handleScroll)}
	}, [])

	const handleScroll = () => {
		if ( scrolledToBottom() ) {
			offset.current += 6
			fetchMore({
				variables: {
					offset: offset.current,
				}
			})
		}
	}

	return (
		<div>
			<SearchBar placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
			<Tabs>
				<span onClick={() => setActiveLanguage(null)} className={!activeLanguage ? "active" : ""}>
					All
				</span>
				{languages.map((language, index) => (
					<span key={index} className={activeLanguage === language ? language.toLowerCase() : ""} onClick={() => setActiveLanguage(language)}>
						{language}
					</span>
				))}
			</Tabs>
			<Grid>
				{loading ? <div>Loading...</div> :
					data.snippet.map((snippet, index) => (
						<SnippetCard {...snippet} key={index} preview={true} />
					))}
			</Grid>
			{ loading && <button> click to load more</button> }
		</div>
	)
}
