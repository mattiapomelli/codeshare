import { useRef } from 'react'
import { executeQuery } from '../graphql/client'
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { useSession } from "next-auth/client"
import styled from "styled-components"
import { Icon } from "./Icon/Icon"
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

export default function Likes({ isLiked, count, snippetId }) {
    const [session] = useSession()
    const fetching = useRef(false);
    const { value, changeCache } = useCache(snippetId, { count: count, liked: isLiked })

    const changeLikeWithCache = async () => { 
        if(!fetching.current) {
            fetching.current = true;
            
            const query = value.liked ? REMOVE_LIKE_MUTATION : ADD_LIKE_MUTATION 
            const newValue = { liked: !value.liked, count: value.liked ? value.count - 1 : value.count + 1}
            changeCache(newValue)
    
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
            {value.count}
            <span onClick={() => {changeLikeWithCache()}}>
                <Icon name={value.liked ? "star" : "starEmpty"} type="primary"/>
            </span>
        </LikesWrapper>
    )
}
