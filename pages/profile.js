import { useState } from 'react'
import { useSession } from 'next-auth/client'
import styled, { css } from 'styled-components'
import { H2, Label } from '../components/Typography'
import Snippets from '../components/Snippets'
import withAuth from '../hocs/withAuth'
import { GET_USER_SNIPPETS_QUERY, GET_LIKED_SNIPPETS_QUERY } from '../graphql/queries'
import { request } from 'graphql-request'

const Tab = styled.li`
    display: inline-block;
    padding: 0.6rem 1rem 0.6rem 0;
    margin-right: 1rem;
    cursor: pointer;
    ${props => props.active && css`
        border-bottom: 3px solid;
        border-image-slice: 1;
        border-image-source: ${props => props.theme.colors.primary};
    `}

    ${props => props.secondary && css`
        ${Label} {
            color: ${props => props.theme.colors.secondaryText};
        }
        &:hover {
            ${Label} {
                color: ${props => props.theme.colors.text}; 
            }
        }
    `};
`

const Tag = styled.span`
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius};
    padding: 0.1rem 0.4rem;
    margin-left: 1rem; 
    font-size: 0.9rem;
`

const TabItem = ({ children, count, active, onClick }) => {
    return (
        <Tab active={active} onClick={onClick} secondary={!active}>
            <Label as="span" inline>{ children }</Label>
            <Tag>{ count }</Tag>
        </Tab>
    )
}

const fetcher = (query, offset, userId) => request( process.env.NEXT_PUBLIC_HASURA_URL, query, {
	limit: 6,
	offset,
	userId: userId,
}).then(data => {
    data.snippets.forEach(snippet => {
		snippet.likesNum = snippet.likes_aggregate.aggregate.count
		snippet.liked =  snippet.likes ? snippet.likes.length > 0 : false
		delete snippet.likes_aggregate
		delete snippet.likes
	})
	return data.snippets
})

function Profile() {
    const [category, setCategory] = useState("snippets")
    const [session] = useSession()

    return (
        <>   
            { session && <H2>{session.user.username}</H2> }

            <TabItem count={50} active={category === 'snippets'} onClick={() => setCategory('snippets')}>Snippets</TabItem>
            <TabItem count={72} active={category === 'liked'} onClick={() => setCategory('liked')}>Liked</TabItem>

            <Snippets
                query={category === "snippets" ? GET_USER_SNIPPETS_QUERY : GET_LIKED_SNIPPETS_QUERY }
                variables={{}}
                fetcher={fetcher}
            />
        </>
    )
}

export default withAuth(Profile)