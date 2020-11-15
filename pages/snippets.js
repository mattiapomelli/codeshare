import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar, Spinner } from "../components/elements/HomeElements"
import useSnippets from '../hooks/useSnippets'

export default function Home() {
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { data, loading, setSize, noResults } = useSnippets(activeLanguage, search)

	const languages = ["Java", "JavaScript", "CSS", "HTML", "SQL", "C"]

	return (
		<div>
			<SearchBar placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
			<Tabs>
				<span onClick={() => {setActiveLanguage(null)}} className={!activeLanguage ? "active" : ""}>
					All
				</span>
				{languages.map((language, index) => (
					<span key={index} className={activeLanguage === language ? language.toLowerCase() : ""}
						onClick={() => {setActiveLanguage(language)}}>
						{language}
					</span>
				))}
			</Tabs>
			{ noResults && "No results"}
			<Grid>
				{
					data.map((snippet, index) => (
						<SnippetCard {...snippet} key={index} preview={true} />
					))
				}
			</Grid>
			<button onClick={() => setSize(size => size + 1)} id="loadMoreButton" style={{display: "none"}}>Load More</button>
			{ loading && <Spinner />}
		</div>
	)
}
