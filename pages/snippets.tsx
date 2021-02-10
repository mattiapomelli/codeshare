import { useEffect } from 'react'
import { useSearch } from '../contexts/SearchContext'
import Dropdown from '../components/Dropdown'
import { IconInput } from '../components/Input'
import Flex from '../components/Flex'
import { H1 } from '../components/Typography'
import graphQLClientAdmin from '../graphql/client'
import {
	GET_PROGRAMMING_LANGS_QUERY,
	GET_LATEST_SNIPPETS_QUERY,
	SEARCH_SNIPPETS_QUERY,
} from '../graphql/queries'
import { request } from 'graphql-request'
import Snippets from '../components/Snippets'
import processSnippet from '../utils/process-snippet'
import PageHead from '../components/PageHead'
import { logPageView } from '../utils/analytics'
import useSnippets from '../hooks/use-snippets'
import { useSession } from 'next-auth/client'
import { Snippet } from '../interfaces/snippet'

const fetcher = (query, params): Promise<Snippet[]> =>
	request(process.env.NEXT_PUBLIC_HASURA_URL, query, {
		...params,
	}).then(data => {
		data.snippets.forEach(snippet => processSnippet(snippet))
		return data.snippets
	})

interface Props {
	langs: string[]
}

export default function SnippetsPage({ langs }: Props) {
	const [session] = useSession()
	const userId = session ? session.user.id : null
	const { search, setSearch, activeLanguage, setActiveLanguage } = useSearch()
	const { data, loading, noResults } = useSnippets(
		search.length > 0 ? SEARCH_SNIPPETS_QUERY : GET_LATEST_SNIPPETS_QUERY,
		search.length > 0
			? {
					search,
					programmingLang: activeLanguage,
					userId,
					isAuth: userId ? true : false,
			  }
			: {
					programmingLang: activeLanguage,
					userId,
					isAuth: userId ? true : false,
			  },
		fetcher
	)

	useEffect(() => {
		logPageView()
	}, [])

	const handleLanguageChange = value => {
		setActiveLanguage(value === 'All' ? null : value)
	}

	return (
		<>
			<PageHead title="Code Snippets – Codeshare" />

			<H1>Snippets</H1>

			<Flex>
				<IconInput
					placeholder="Search..."
					value={search}
					onChange={e => {
						setSearch(e.target.value.toLowerCase())
					}}
					icon="search"
					style={{ marginRight: '0.9rem' }}
				/>
				<Dropdown
					options={['All'].concat(langs)}
					onSelect={handleLanguageChange}
					value={activeLanguage || 'All'}
				/>
			</Flex>

			<Snippets data={data} loading={loading} noResults={noResults} />
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
		props: { langs },
	}
}
