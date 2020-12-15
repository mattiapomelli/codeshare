import {  useEffect, useRef } from 'react'
import { useSWRInfinite } from 'swr'
import scrolledToBottom from "../utils/scrolled-to-bottom"
import { useSession } from "next-auth/client"

const useInfiniteScrolling = (query, variables, fetcher) => {
	const [session] = useSession()
	const userId = session ? session.user.id : null
	const loadingMore = useRef(false)
	const reachedEnd = useRef(false)

	const { data, error, size, setSize } = useSWRInfinite(
		index => [query, index*6, userId, ...Object.values(variables)],
		fetcher,
		{ 
			revalidateAll: false,
			revalidateOnFocus: false,
		}
	)

	const snippets = data ? [].concat(...data) : [];
	const isLoadingInitialData = !data && !error;
	const isEmpty = data?.[0]?.length === 0;
	const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");

	useEffect(() => {
		loadingMore.current = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
		reachedEnd.current = isEmpty || (data && data[data.length - 1]?.length < 6);
	}, [data, size])

	useEffect(() => {
		function handleScroll() {
			if ( scrolledToBottom() && !loadingMore.current && !reachedEnd.current) {
				const button = document.getElementById("loadMoreButton");
				button.click();
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => { window.removeEventListener('scroll', handleScroll)}
	}, [])
    
    return {
        data: snippets,
        loading: isLoadingMore,
		setSize,
		noResults: snippets.length == 0 && !isLoadingMore,
    }
}

export default useInfiniteScrolling