import { Fragment } from 'react'
import {  useQuery } from '@apollo/client'
import { GET_ALL_SNIPPETS_QUERY } from "../graphql/queries"
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar } from "../components/elements/HomeElements"

export default function Home() {
  	const { loading, error, data } = useQuery(GET_ALL_SNIPPETS_QUERY)
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const languages = ["java", "javascript", "css", "html", "sql", "c"]

	return (
		<div>
			<SearchBar placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
			<Tabs>
				<span onClick={() => setActiveLanguage("")} className={!activeLanguage ? "active" : ""}>
					latest
				</span>
				{languages.map((language, index) => (
						<span key={index} className={activeLanguage === language ? language : ""} onClick={() => setActiveLanguage(language)}>
							{language}
						</span>
				))}
			</Tabs>
			<Grid>
				{ loading ? <div>Loading...</div> :
				data.snippet.map((snippet, index) => (
						<SnippetCard {...snippet} key={index} preview={true}/>
				))}
			</Grid>
		</div>
	)
}
