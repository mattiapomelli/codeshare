import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Input, Grid, Skeleton } from "../components/elements/MainElements"
import Dropdown from "../components/Dropdown"
import useSnippets from '../hooks/useSnippets'

const languages = ["All", "Java", "JavaScript", "CSS", "HTML", "SQL", "C"]

export default function Home() {
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { data, loading, setSize, noResults } = useSnippets(activeLanguage, search)

	return (
		<div>
			<Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
			<Dropdown options={languages} onSelect={setActiveLanguage} value={activeLanguage} nullValue="All"/>
			{ noResults && "No results"}
			<Grid>
				{
					data.map((snippet, index) => (
						<SnippetCard {...snippet} key={index}/>
					))
				}
				{ loading &&
				[1, 2, 3, 4, 5, 6].map((key) => (
					<article key={key}>
						<Skeleton h="280px"/>
						<div style={{marginLeft: "5px"}}>
							<Skeleton h="1rem" w="80%"/>
							<Skeleton h="0.8rem" w="50%"/>
						</div>		
					</article>
				))}
			</Grid>
			<button onClick={() => setSize(size => size + 1)} id="loadMoreButton" style={{display: "none"}}>Load More</button>
		</div>
	)
}
