import {  useEffect, useRef } from 'react'
import { request } from "graphql-request"
import { useSWRInfinite } from 'swr'
import scrolledToBottom from "../utils/scrolled-to-bottom"
import { GET_FILTERED_SNIPPETS_QUERY } from "../graphql/queries"
import { useSession } from "next-auth/client"
import { user } from '../components/Icon/icons'

const fetcher = (query, offset, lang, search, userId) => request( process.env.NEXT_PUBLIC_HASURA_URL, query, {
	limit: 6,
	order: search.length > 0 ? null : "desc",
	offset,
	programmingLang: lang,
	search: search,
	userId: userId,
	isAuth: userId ? true : false
}).then(data => {return data.snippets});


const useInfiniteScrolling = (activeLanguage, search) => {
	const [session] = useSession()
	const userId = session ? session.user.id : null
	const loadingMore = useRef(false)
	const reachedEnd = useRef(false)
	const { data, error, size, setSize } = useSWRInfinite(
		index => [GET_FILTERED_SNIPPETS_QUERY, index*6, activeLanguage, search, userId],
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
			const button = document.getElementById("loadMoreButton");
			button.click();
		}
    }
    
    return {
        data: snippets,
        loading: isLoadingMore,
		setSize,
		noResults: snippets.length == 0 && !isLoadingMore
    }
}

export default useInfiniteScrolling