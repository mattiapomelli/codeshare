import { useState, useRef, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_FILTERED_SNIPPETS_QUERY } from "../graphql/queries"
import scrolledToBottom from "../utils/scrolled-to-bottom"
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar, Spinner } from "../components/elements/HomeElements"

export default function Home() {
	const offset = useRef(0)
	const hasMoreData = useRef(true)
	const [moreData, setMoreData ] = useState(true);
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { loading, data, fetchMore } = useQuery(GET_FILTERED_SNIPPETS_QUERY, {
		variables: {
			offset: offset.current,
			limit: 6,
			order: search > 0 ? null : "desc",
			programmingLang: activeLanguage,
			search: search
		}
	})

	const languages = ["Java", "JavaScript", "CSS", "HTML", "SQL", "C"]

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => { window.removeEventListener('scroll', handleScroll)}
	}, [])

	let fetching = false;
	const handleScroll = () => {
		if ( scrolledToBottom() && hasMoreData.current && !fetching) {
			fetching = true;
			offset.current += 6
			fetchMore({
				variables: {
					offset: offset.current,
				}
			}).then(result => {
				fetching = false
				if(result.data.snippets.length == 0)
					setMoreData(false)
			})
		}
	}

	useEffect(() => {
		hasMoreData.current = moreData
	}, [moreData])

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
					data.snippets.map((snippet, index) => (
						<SnippetCard {...snippet} key={index} preview={true} />
					))}
			</Grid>
			{ moreData && <Spinner />}
		</div>
	)
}
