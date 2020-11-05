import { Fragment, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_SNIPPETS_QUERY } from "../graphql/queries"
import SnippetCard from "../components/SnippetCard"
import { useSearch } from '../contexts/SearchContext'
import { Grid, Tabs, SearchBar } from "../components/elements/HomeElements"

export default function Home() {

	const { loading, data,fetchMore } = useQuery(GET_ALL_SNIPPETS_QUERY, {
		variables: {
			offset: 0,
			limit: 4
		},
	})
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();

	const onLoadMore = () => {
		fetchMore({
			variables: {
			  offset: data.snippet.length,
			  limit:4
			}
		},)
	}
	useEffect(()=>{
		console.log(data);
	},[data]);
	return (
		<div>
			<SearchBar placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
			<Tabs>
				<span onClick={() => setActiveLanguage(null)} className={!activeLanguage ? "active" : ""}>
					All
				</span>
				{languages.map((language, index) => (
					<span key={index} className={activeLanguage === language ? language : ""} onClick={() => setActiveLanguage(language)}>
						{language}
					</span>
				))}
			</Tabs>
			<Grid>
				{!data ? <div>Loading...</div> :
					data.snippet.map((snippet, index) => (
						<SnippetCard {...snippet} key={index} preview={true} />
					))}
			</Grid>
			<button onClick={onLoadMore}> click to load more</button>
		</div>
	)
}
