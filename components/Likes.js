import { useRef } from 'react'
import { executeQuery } from '../graphql/client'
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { GET_FILTERED_SNIPPETS_QUERY } from "../graphql/queries"
import { useSession } from "next-auth/client"
import styled from "styled-components"
import { Icon } from "./Icon/Icon"
import { mutate, cache } from 'swr'
import { likesCache } from "../utils/cache"
import useCache from '../hooks/useCache'

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
                if(item.id == snippetId) {
                    item.likesNum += increment;
                    item.liked = !item.liked
                    break;
                }
            }
        }
        return data
    }))
}

function mutateSingleSnippetKey(partialKey, increment) {
    cache.keys()
    .filter(key => key.includes(partialKey) && !( key.includes("validating") || key.includes("err") || key.includes("size")))
    .forEach(key => mutate(key, async data => {
        data.likesNum += increment
        data.liked = !data.liked
    }))
}

export default function Likes({ isLiked, setIsLiked, count, setCount, snippetId }) {
    const [session] = useSession()
    const fetching = useRef(false);
    const { value, changeCache } = useCache(snippetId, { count: count, liked: isLiked })

    const changeLike = async () => { 
        if(!fetching.current) {
            fetching.current = true;
            
            const query = isLiked ? REMOVE_LIKE_MUTATION : ADD_LIKE_MUTATION
            const increment = isLiked ? -1 : 1  
    
            try {
                const res = await executeQuery( query, {
                    userId: session.user.id,
                    snippetId
                }, session.user.jwt)
                
                fetching.current = false;
    
                if(res.action.affected_rows == 1) {
                    setIsLiked(isLiked => !isLiked);
                    setCount(count => count + increment)
            
                    mutateSWRPartialKeys(GET_FILTERED_SNIPPETS_QUERY, snippetId, increment)
                    mutateSingleSnippetKey(snippetId, increment)
                    console.log(cache)
                }
    
            } catch (err) {
                fetching.current = false;
            }
        }
    }

    const changeLikeWithCache = async () => { 
        if(!fetching.current) {
            fetching.current = true;
            
            const query = value.liked ? REMOVE_LIKE_MUTATION : ADD_LIKE_MUTATION 
            changeCache()
    
            try {
                await executeQuery( query, {
                    userId: session.user.id,
                    snippetId
                }, session.user.jwt)
                
                fetching.current = false;
    
            } catch (err) {
                fetching.current = false;
            }
        }
    }

    return (
        <LikesWrapper>
            <button onClick={() => {changeLikeWithCache()}}>Set</button>
            {value.count}
            <span onClick={changeLike}>
                <Icon name={value.liked ? "star" : "starEmpty"} type="primary"/>
            </span>
        </LikesWrapper>
    )
}
