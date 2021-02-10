import { useRef } from 'react'
import { executeQuery } from '../../graphql/client'
import {
	ADD_LIKE_MUTATION,
	REMOVE_LIKE_MUTATION,
} from '../../graphql/mutations'
import { GET_LIKED_SNIPPETS_COUNT } from '../../graphql/queries'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import Icon from '../Icon'
import useCache from '../../hooks/use-cache'
import { useRouter } from 'next/router'
import { mutate, cache } from 'swr'

const LikesWrapper = styled.div`
	display: inline-flex;
	align-items: center;
	margin-left: 10px;
	span {
		line-height: 1;
		cursor: pointer;
	}
`

interface Props {
	isLiked: boolean
	count: number
	snippetId: string
}

export default function Likes({ isLiked, count, snippetId }: Props) {
	const [session] = useSession()
	const router = useRouter()
	const fetching = useRef(false)
	const { value, changeCache } = useCache(snippetId, {
		count: count,
		liked: isLiked,
	})

	const changeLikeWithCache = async () => {
		if (!session) {
			router.push('/login')
			return
		}

		if (!fetching.current) {
			fetching.current = true

			const query = value.liked ? REMOVE_LIKE_MUTATION : ADD_LIKE_MUTATION
			const increment = value.liked ? -1 : 1
			const newValue = { liked: !value.liked, count: value.count + increment }
			changeCache(newValue)

			// mutate snippets liked by logged user count, if already exists in cache
			const key = [GET_LIKED_SNIPPETS_COUNT, session.user.id]
			if (cache.has(key)) {
				mutate(key, async data => data + increment, false)
			}

			try {
				await executeQuery(query, {
					userId: session.user.id,
					snippetId,
				})

				if (cache.has(key)) {
					mutate([GET_LIKED_SNIPPETS_COUNT, session.user.id])
				}

				fetching.current = false
			} catch (err) {
				fetching.current = false
			}
		}
	}

	return (
		<LikesWrapper>
			{value.count}
			<span
				onClick={() => {
					changeLikeWithCache()
				}}
			>
				<Icon icon={value.liked ? 'star' : 'starEmpty'} variant="primary" />
			</span>
		</LikesWrapper>
	)
}
