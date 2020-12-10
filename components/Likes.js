import { executeQuery } from '../graphql/client'
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { GET_FILTERED_SNIPPETS_QUERY, GET_SINGLE_SNIPPET_QUERY } from "../graphql/queries"
import { useSession } from "next-auth/client"
import styled from "styled-components"
import { Icon } from "./Icon/Icon"
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

function mutateSWRPartialKeys(partialKey, snippetId, increment) {
    cache.keys()
    .filter(key => key.includes(partialKey) && !( key.includes("validating") || key.includes("err") || key.includes("size")))
    .forEach(key => mutate(key, async data => {
        if(Array.isArray(data) && !Array.isArray(data[0])) {
            for(let item of data) {
                console.log(item)
                if(item.id == snippetId) {
                    item.likesNum += increment;
                    item.liked = !item.liked
                    break;
                }
            }
        }
        console.log(data,  typeof data)
        return data
    }))
}

export default function Likes({ isLiked, setIsLiked, count, setCount, snippetId, mutate }) {
    const [session] = useSession()

    const changeLike = async () => {
        const query = isLiked ? REMOVE_LIKE_MUTATION : ADD_LIKE_MUTATION
        const increment = isLiked ? -1 : 1

        try {
            const res = await executeQuery( query, {
                userId: session.user.id,
                snippetId
            }, session.user.jwt)

            if(res.action.affected_rows == 1) {
                setIsLiked(isLiked => !isLiked);
                setCount(count => count + increment)

                mutateSWRPartialKeys(GET_FILTERED_SNIPPETS_QUERY, snippetId, increment)
                console.log(cache)
                // mutate([GET_SINGLE_SNIPPET_QUERY, snippetId])
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <LikesWrapper>
            {count}
            <span onClick={changeLike}>
                <Icon name={isLiked ? "star" : "starEmpty"} type="primary"/>
            </span>
        </LikesWrapper>
    )
}
