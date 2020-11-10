import {  useEffect } from 'react'
import { request } from "graphql-request"
import { useSWRInfinite } from 'swr'
import scrolledToBottom from "../utils/scrolled-to-bottom"
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar, Spinner } from "../components/elements/HomeElements"

const GET_FILTERED_SNIPPETS_QUERY = `
	query SearchSnippetsQuery($search: String, $programmingLang: String, $order: order_by, $limit: Int!, $offset: Int!) {
	snippets: search_snippet(args: {search: $search}, where: {programmingLang: {_eq: $programmingLang}}, order_by: {createdAt: $order}, limit: $limit, offset: $offset) {
		title
		code
		createdAt
		programmingLang
		id
	}
	}
`
const variables = {
	limit: 6,
	order: "desc",
	programmingLang: null,
	search: ''
}
const fetcher = (query, offset) => request('https://climbing-bear-85.hasura.app/v1/graphql', query, {...variables, offset})

export default function Home() {
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
		index => [GET_FILTERED_SNIPPETS_QUERY, index*6],
		fetcher
	)

	const isLoadingInitialData = !data && !error;
	const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
	console.log('Loading more: ', isLoadingMore)

	const languages = ["Java", "JavaScript", "CSS", "HTML", "SQL", "C"]

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => { window.removeEventListener('scroll', handleScroll)}
	}, [])

	const handleScroll = () => {
		if ( scrolledToBottom()) {
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
				{ !isLoadingInitialData && 
					data.map(set => {
						return set.snippets.map((snippet, index) => (
							<SnippetCard {...snippet} key={index} preview={true} />
						))
					})
				}
					
			</Grid>
			<button onClick={() => setSize(size + 1)}>Load more</button>
		</div>
	)
}
