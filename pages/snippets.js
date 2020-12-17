import { useSearch } from '../contexts/SearchContext'
import Dropdown from "../components/Dropdown/Dropdown"
import { IconInput } from "../components/Input"
import Flex from '../components/Flex'
import { H1 } from '../components/Typography'
import graphQLClientAdmin from '../graphql/client'
import { GET_PROGRAMMING_LANGS_QUERY, GET_LATEST_SNIPPETS_QUERY, SEARCH_SNIPPETS_QUERY } from '../graphql/queries'
import { request } from "graphql-request"
import Snippets from '../components/Snippets'
import processSnippet from '../utils/processSnippet'
import PageHead from '../components/PageHead'

const fetcher = (query, offset, userId, lang) => request( process.env.NEXT_PUBLIC_HASURA_URL, query, {
	limit: 6,
	offset,
	userId: userId,
	programmingLang: lang,
	isAuth: userId ? true : false
}).then(data => {
    data.snippets.forEach(snippet => processSnippet(snippet))
	return data.snippets
})

const searchFetcher = (query, offset, userId, search, lang) => request( process.env.NEXT_PUBLIC_HASURA_URL, query, {
	limit: 6,
	offset,
	userId: userId,
	search,
	programmingLang: lang,
	isAuth: userId ? true : false
}).then(data => {
    data.snippets.forEach(snippet => processSnippet(snippet))
	return data.snippets
})

export default function Home({ langs }) {
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch();

	return (
		<>
			<PageHead title="Code Snippets – Codeshare"/>

			<H1>Snippets</H1>

			<Flex>
				<IconInput
					placeholder="Search..."
					value={search}
					onChange={(e) => { setSearch(e.target.value)}}
					icon="search"
					style={{marginRight: '0.9rem'}}
					minWidth="16rem"
					double={search.length > 0}
					secondIcon="cross"
				/>
				<Dropdown
					options={["All"].concat(langs)}
					onSelect={setActiveLanguage}
					value={activeLanguage}
					nullValue="All"
					minWidth="7rem"
				/>
			</Flex>
			
			<Snippets
				query={search.length > 0 ? SEARCH_SNIPPETS_QUERY : GET_LATEST_SNIPPETS_QUERY}
				variables={ search.length > 0 ? { search:search, programmingLang: activeLanguage } : {programmingLang: activeLanguage}}
				fetcher={search.length > 0 ? searchFetcher : fetcher}
			/>
			
		</>
	)
}

export async function getStaticProps() {
	const data = await graphQLClientAdmin.request(GET_PROGRAMMING_LANGS_QUERY)
	
	const langs = []
	data.langs.forEach(lang => {
		langs.push(lang.name)
	})

	return {
		props: { langs }
	}
}