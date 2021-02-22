import { GetStaticProps, NextPage } from 'next'
import { useState, useEffect, useRef } from 'react'
import Dropdown from '@/components/Dropdown'
import { IconInput } from '@/components/Input'
import Flex from '@/components/Flex'
import { H1 } from '@/components/Typography'
import graphQLClientAdmin from '@/graphql/client'
import {
	GET_PROGRAMMING_LANGS_QUERY,
	GET_LATEST_SNIPPETS_QUERY,
	SEARCH_SNIPPETS_QUERY,
} from '@/graphql/queries'
import Snippets from '@/components/Snippets'
import PageHead from '@/components/PageHead'
import useSnippets from '@/hooks/use-snippets'
import { useSession } from 'next-auth/client'
import { fetcher } from '@/graphql/client'
import useCache from '@/hooks/use-cache'
import DashboardLayout from '@/layouts/DashboardLayout'
import { PageWithLayout } from 'types'

const SnippetsPage: PageWithLayout<{ langs: string[] }> = ({ langs }) => {
	const [session] = useSession()
	const typingTimer = useRef<number>()
	const [search, setSearch] = useCache('search', '')
	const [lang, setLang] = useCache('lang', null)
	const [searchValue, setSearchValue] = useState(search)

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

	const handleLanguageChange = (value: string) => {
		setLang(value === 'All' ? null : value)
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	useEffect(() => {
		window.clearTimeout(typingTimer.current)

		typingTimer.current = window.setTimeout(() => {
			setSearch(searchValue)
		}, 250)
	}, [searchValue, setSearch])

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

SnippetsPage.layout = DashboardLayout

export default SnippetsPage

export const getStaticProps: GetStaticProps = async () => {
	const data = await graphQLClientAdmin.request(GET_PROGRAMMING_LANGS_QUERY)

	const langs = []
	data.langs.forEach((lang) => {
		langs.push(lang.name)
	})

	return {
		props: { langs },
	}
}
