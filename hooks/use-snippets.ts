import { useState, useEffect, useRef } from 'react'
import { useSWRInfinite } from 'swr'
import scrolledToBottom from '../utils/scrolled-to-bottom'
import { useSession } from 'next-auth/client'
import { Snippet } from '../interfaces/snippet'

const PAGE_LIMIT = 6

type Params = {
	[key: string]: any
}

type Fetcher = (query: string, params: Params) => Promise<Snippet[]>

const useSnippets = (query: string, variables: Params, fetcher: Fetcher) => {
	const [, sessionLoading] = useSession()
	const loadingMore = useRef(false)
	const reachedEnd = useRef(false)
	const [isLoading, setIsLoading] = useState(true)

	const getKey = (index: number) => {
		if (sessionLoading) return null
		return [query, index * PAGE_LIMIT, ...Object.values(variables)]
	}

	const wrappedFetcher = (query: string, offset: number) => {
		const params = {
			limit: PAGE_LIMIT,
			offset,
			...variables,
		}

		return fetcher(query, params)
	}

	const { data, error, size, setSize } = useSWRInfinite(
		getKey,
		wrappedFetcher,
		{
			revalidateAll: false,
			revalidateOnFocus: false,
		}
	)

	const snippets = data ? [].concat(...data) : []

	useEffect(() => {
		loadingMore.current = isLoading
	}, [isLoading])

	useEffect(() => {
		const isLoadingInitialData = !data && !error
		const isEmpty = data?.[0]?.length === 0

		const temp =
			isLoadingInitialData ||
			(size > 0 && data && typeof data[size - 1] === 'undefined')

		setIsLoading(temp)

		reachedEnd.current =
			isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT)
	}, [data, size, error])

	useEffect(() => {
		function handleScroll() {
			if (scrolledToBottom() && !loadingMore.current && !reachedEnd.current) {
				setSize(size => size + 1)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [setSize])

	return {
		data: snippets,
		loading: isLoading,
		noResults: snippets.length == 0 && !isLoading,
	}
}

export default useSnippets
