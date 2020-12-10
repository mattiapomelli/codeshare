import { executeQuery } from '../graphql/client'
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { GET_FILTERED_SNIPPETS_QUERY, GET_SINGLE_SNIPPET_QUERY } from "../graphql/queries"
import { useSession } from "next-auth/client"
import styled from "styled-components"
import { Icon } from "./Icon/Icon"
// import { mutate } from 'swr'
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
    .filter(key => key.includes(cache.serializeKey([partialKey])))
    .forEach(key => cache.delete(key))
    // cache
    // .keys()
    // .filter(key => key.includes(partialKey))
    // .forEach(key => mutate(key, async data => {
    //     if(typeof data == 'object') {
    //         data.forEach(item => {
    //             if(item.id == snippetId) {
    //                 item.likes_aggregate.aggregate.count ++;
    //                 // item.likes.push({ createdAt: Date.now()})
    //             }
    //         })
    //         // console.log(data)
    //     }
    //     return data
    // }))
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
                // mutate(async data => {
                //     data.forEach(set => {
                //         console.log(set)
                //         set.forEach(snippet => {
                //             if(snippet.id == snippetId) {
                //                 console.log(snippet)
                //                 snippet.likesNum += increment
                //                 snippet.liked = !snippet.liked
                //             }
                //         })
                //     })
                //     return data
                // }, false)
                // mutate()
                setIsLiked(isLiked => !isLiked);
                setCount(count => count + increment)
                // mutate(data => {
                //     data.forEach(set => {
                //         set.forEach(item => {
                //             if(item.id == snippetId) {
                //                 item.likes_aggregate.aggregate.count += increment
                //                 console.log(cache)
                //                 // item.likes.push({ createdAt: Date.now()})
                //             }
                //         })
                //     })
                //     console.log(data)
                //     return data
                // })
                // secondMutate()
                // mutateSWRPartialKeys(GET_FILTERED_SNIPPETS_QUERY, snippetId, increment)
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
