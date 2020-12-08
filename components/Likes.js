import { executeQuery } from '../graphql/client'
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { GET_FILTERED_SNIPPETS_QUERY } from "../graphql/queries"
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

function mutateSWRPartialKeys(partialKey) {
    cache
    .keys()
    .filter(key => key.includes(partialKey))
    .forEach(key => mutate(key))
}

export default function Likes({ isLiked, setIsLiked, count, setCount, snippetId }) {
    const [session] = useSession()

    const changeLike = () => {
        const query = isLiked ? REMOVE_LIKE_MUTATION : ADD_LIKE_MUTATION
        const increment = isLiked ? -1 : 1
        executeQuery( query, {
            userId: session.user.id,
            snippetId
        }, session.user.jwt
        ).then(data => {
            if(data.action.affected_rows == 1) {
                setIsLiked(isLiked => !isLiked);
                setCount(count => count + increment)
                mutateSWRPartialKeys(GET_FILTERED_SNIPPETS_QUERY)
            }
        }).catch(err => {
            console.log(err)
        })
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
