import {  useEffect, useRef } from 'react'
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

const fetcher = (query, offset, lang, search) => request('https://climbing-bear-85.hasura.app/v1/graphql', query, {
	limit: 6,
	order: "desc",
	offset,
	programmingLang: lang,
	search: search
})

const processData = (data) => {
	let result = [];
	data.forEach(set => {
		const { snippets } = set
		result = result.concat(...snippets)
	})
	return result
} 

export default function Home() {
	const loadingMore = useRef(false)
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
		index => [GET_FILTERED_SNIPPETS_QUERY, index*6, activeLanguage, search],
		fetcher
	)

	const isLoadingInitialData = !data && !error;
	const snippets = data ? processData(data) : []

	useEffect(() => {
		loadingMore.current = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
	}, [data, size])

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => { window.removeEventListener('scroll', handleScroll)}
	}, [])

	const handleScroll = () => {
		console.log(loadingMore.current)
		if ( scrolledToBottom() && !loadingMore.current) {
			setSize(size => size + 1)
			console.log('loading more, offset: ', size)
		}
	}

	const languages = ["Java", "JavaScript", "CSS", "HTML", "SQL", "C"]

	return (
		<div>
			<SearchBar placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
			<Tabs>
				<span onClick={() => {setActiveLanguage(null), setSize(0)}} className={!activeLanguage ? "active" : ""}>
					All
				</span>
				{languages.map((language, index) => (
					<span key={index} className={activeLanguage === language ? language.toLowerCase() : ""}
						onClick={() => {setActiveLanguage(language), setSize(0)}}>
						{language}
					</span>
				))}
			</Tabs>
			<Grid>
				{
					snippets.map((snippet, index) => (
						<SnippetCard {...snippet} key={index} preview={true} />
					))
				}
					
			</Grid>
		</div>
	)
}
