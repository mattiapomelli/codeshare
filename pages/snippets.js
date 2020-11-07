import { useState, useRef, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_SNIPPETS_QUERY } from "../graphql/queries"
import scrolledToBottom from "../utils/scrolled-to-bottom"
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar, Spinner } from "../components/elements/HomeElements"

export default function Home() {
	const offset = useRef(0)
	const loadedEverything = useRef(false)
	const [fetching, setFetching] = useState(false)
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { loading, data, fetchMore } = useQuery(GET_ALL_SNIPPETS_QUERY, {
		variables: {
			offset: offset.current,
			limit: 6
		}
	})

	const languages = ["Java", "Javascript", "CSS", "HTML", "SQL", "C"]

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => { window.removeEventListener('scroll', handleScroll)}
	}, [])

	const handleScroll = () => {
		if ( scrolledToBottom() && !loadedEverything.current && !fetching) {
			setFetching(true)
			offset.current += 6
			fetchMore({
				variables: {
					offset: offset.current,
				}
			}).then(result => {
				setFetching(false)
				if(result.data.snippet.length == 0)
					loadedEverything.current = true;
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
				{!loading &&
					data.snippet.map((snippet, index) => (
						<SnippetCard {...snippet} key={index} preview={true} />
					))}
			</Grid>
			{ (loading || fetching) && <Spinner />}
		</div>
	)
}
