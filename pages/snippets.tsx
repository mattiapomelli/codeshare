import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
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
import Snippets from '../components/Snippets'
import PageHead from '../components/PageHead'
import { logPageView } from '../utils/analytics'
import useSnippets from '../hooks/use-snippets'
import { useSession } from 'next-auth/client'
import { fetcher } from '../graphql/client'

interface Props {
	langs: string[]
}

const getURLFromParams = (params: { [key: string]: string }): string => {
	const urlParams = []

	for (const key in params) {
		if (!params[key]) continue

		const value = params[key]

		urlParams.push(`${key}=${value.replace(' ', '+')}`)
	}

	return urlParams.length > 0 ? '?' + urlParams.join('&') : ''
}

function useInitialStateFromQuery(
	key: string,
	defaultValue: string | null
): [string, Dispatch<SetStateAction<string>>] {
	const router = useRouter()
	const value = router.query[key]

	const [state, setState] = useState<string>(() => {
		if (!value) return defaultValue
		return Array.isArray(value) ? value[0] : value
	})

	return [state, setState]
}

export default function SnippetsPage({ langs }: Props) {
	const [session] = useSession()
	const router = useRouter()
	const typingTimer = useRef<number>()
	const [searchValue, setSearchValue] = useInitialStateFromQuery('q', '')
	const [search, setSearch] = useInitialStateFromQuery('q', '')
	const [lang, setLang] = useInitialStateFromQuery('lang', null)

	const userId = session ? session.user.id : null
	const isSearch = search.length > 0
	const params = {
		programmingLang: lang,
		userId,
		isAuth: userId ? true : false,
		...(isSearch && { search }),
	}

	const { data, loading, noResults } = useSnippets(
		isSearch ? SEARCH_SNIPPETS_QUERY : GET_LATEST_SNIPPETS_QUERY,
		params,
		fetcher
	)

	useEffect(() => {
		logPageView()
	}, [])

	const handleLanguageChange = (value: string) => {
		setLang(value === 'All' ? null : value)
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	useEffect(() => {
		window.clearTimeout(typingTimer.current)

		typingTimer.current = window.setTimeout(() => {
			const href = getURLFromParams({ q: searchValue, lang: lang })

			router.push(`/snippets${href}`, undefined, {
				shallow: true,
			})

			setSearch(searchValue)
		}, 250)
	}, [searchValue, lang])

	return (
		<>
			<PageHead title="Code Snippets – Codeshare" />

			<H1>Snippets</H1>

			<Flex>
				<IconInput
					placeholder="Search..."
					value={searchValue}
					onChange={handleSearchChange}
					icon="search"
					style={{ marginRight: '0.9rem' }}
				/>
				<Dropdown
					options={['All'].concat(langs)}
					onSelect={handleLanguageChange}
					value={lang || 'All'}
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
