import { useEffect, useRef } from 'react'
import { useSWRInfinite } from 'swr'
import scrolledToBottom from '../utils/scrolled-to-bottom'
import { useSession } from 'next-auth/client'

const SNIPPETS_PER_PAGE = 6

const useSnippets = (query, variables, fetcher) => {
	const [, loading] = useSession()
	const loadingMore = useRef(false)
	const reachedEnd = useRef(false)

	const getKey = index => {
		if (loading) return null
		return [query, index * SNIPPETS_PER_PAGE, ...Object.values(variables)]
	}

	const wrappedFetcher = (query, offset) => {
		const params = {
			limit: SNIPPETS_PER_PAGE,
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
	const isLoadingInitialData = !data && !error
	const isEmpty = data?.[0]?.length === 0
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === 'undefined')

	useEffect(() => {
		loadingMore.current =
			isLoadingInitialData ||
			(size > 0 && data && typeof data[size - 1] === 'undefined')

		reachedEnd.current = isEmpty || (data && data[data.length - 1]?.length < 6)
	}, [data, size])

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
		loading: isLoadingMore,
		noResults: snippets.length == 0 && !isLoadingMore,
	}
}

export default useSnippets
