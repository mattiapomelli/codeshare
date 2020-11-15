import {  useEffect, useRef } from 'react'
import { request } from "graphql-request"
import { useSWRInfinite } from 'swr'
import scrolledToBottom from "../utils/scrolled-to-bottom"
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar, Spinner } from "../components/elements/HomeElements"
import next from 'next'

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
}).then(data => {return data.snippets});


export default function Home() {
	const loadingMore = useRef(false)
	const reachedEnd = useRef(false)
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();
	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
		index => [GET_FILTERED_SNIPPETS_QUERY, index*6, activeLanguage, search],
		fetcher,
		{ 
			revalidateAll: false,
			revalidateOnFocus: false,
			//revalidateOnReconnect: false,
		}
	)

	const snippets = data ? [].concat(...data) : [];
	const isLoadingInitialData = !data && !error;
	const isEmpty = data?.[0]?.length === 0;
	const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
	//const reachedEnd = isEmpty || (data && data[data.length - 1]?.length < 6);
	console.log(reachedEnd)

	useEffect(() => {
		loadingMore.current = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
		reachedEnd.current = isEmpty || (data && data[data.length - 1]?.length < 6);
	}, [data, size])

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => { window.removeEventListener('scroll', handleScroll)}
	}, [])

	const handleScroll = () => {
		if ( scrolledToBottom() && !loadingMore.current && !reachedEnd.current) {
			//setSize(size => size + 1)
			const button = document.getElementById("loadmorebutton");
			button.click();
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
						onClick={() => {setActiveLanguage(language)}}>
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
			<button onClick={() => setSize(size => size + 1)} id="loadmorebutton">Load More</button>
			{ isLoadingMore && <Spinner />}
		</div>
	)
}
