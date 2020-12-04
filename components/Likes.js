import { GraphQLClient } from "graphql-request"
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from "../graphql/mutations"
import { useSession } from "next-auth/client"
import styled from "styled-components"
import { Icon } from "./Icon/Icon"

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL, {
    headers: {
        "x-hasura-admin-secret": "UNIMI2020"
    }
})

const LikesWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    margin-left: 10px;
    span {
        line-height: 1;
        cursor: pointer;
    }
`

export default function Likes({ isLiked, setIsLiked, count, setCount, snippetId }) {
    const [session] = useSession()

    const changeLike = () => {
        const query = isLiked ? REMOVE_LIKE_MUTATION : ADD_LIKE_MUTATION
        const increment = isLiked ? -1 : 1
        console.log("yo")
        graphQLClient.request( query, {
            userId: session.user.id,
            snippetId
        }).then(data => {
            if(data.action.affected_rows == 1) {
                setIsLiked(isLiked => !isLiked);
                setCount(count => count + increment)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <LikesWrapper>
            {count}
            <span onClick={changeLike}>
                <Icon name={isLiked ? "star" : "starEmpty"} />
            </span>
        </LikesWrapper>
    )
}
