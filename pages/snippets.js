import {  useQuery } from '@apollo/client'
import { GET_LATEST_SNIPPETS_QUERY, GET_FILTERED_SNIPPETS } from "../graphql/queries"
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar } from "../components/elements/HomeElements"

export default function Home() {
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();

	const query = search.length > 0 ? GET_FILTERED_SNIPPETS : GET_LATEST_SNIPPETS_QUERY
	const variables = search.length > 0 ? { search: search, programmingLang: activeLanguage } : { programmingLang: activeLanguage }

	const { loading, error, data } = useQuery(query, { variables }) 
	//console.log(query.definitions[0].name.value ,variables)
	
	const languages = ["Java", "JavaScript", "CSS", "HTML", "SQL", "C"]

	return (
		<div>
			<SearchBar placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
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
				{ loading ? <div>Loading...</div> :
					data?.snippets.length > 0 ?
				
					data.snippets.map((snippet, index) => (
							<SnippetCard {...snippet} key={index} preview={true}/>
					)) :
					<div>No results</div>
				}
			</Grid>
		</div>
	)
}
