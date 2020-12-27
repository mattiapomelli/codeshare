import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/client'
import useSWR from 'swr'
import { executeQuery } from '../graphql/client'
import { GET_USER_INFO_QUERY } from '../graphql/queries'
import { Button } from '../components/Button'
import withAuth from '../hocs/withAuth'
import { H2, Label } from '../components/Typography'
import PageHead from '../components/PageHead'
import { Skeleton } from '../components/Skeleton'
import Flex from '../components/Flex'
import styled from 'styled-components'
import ChangePasswordForm from '../components/PasswordForm'
import { logPageView } from '../utils/analytics'

const SettingsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 25px;
    margin: 1rem 0;
`

const Card = styled.div`
    background-color: ${props => props.theme.colors.elements};
    padding: 1rem;
    border-radius: 0.8rem;
    width: 100%;
    flex: 1;
`

const Field = styled.div`
    margin-bottom: 1.2rem;
    span { margin-left: 5px; font-weight: 300; }
`

const SettingCard = ({ children, title }) => {
    return (  
        <Flex dir="column" >
            <Label>{title}</Label>
            <Card>
                {children}
            </Card>
        </Flex>
    )
}

const InfoField = ({ children, title}) => (
    <Field>
        <Label>{title} </Label>
        { children ? <span>{children}</span> : <Skeleton h="1.55rem" w="20rem" mx="65%"/> }
    </Field>
)

function Account() {
    const [session] = useSession()
    const { data: userData } = useSWR( session ? [GET_USER_INFO_QUERY, session.user.id] : null, (query, id) => {
        return executeQuery(query, {id}, session.user.jwt).then(res => res.user)
    })

    useEffect(()=>{
        logPageView()
    },[])

    const logOut = () => {
        signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
    }
    
    return (
        <> 
            <PageHead title="Account – Codeshare"/>

            <H2>Account</H2>

            <SettingsGrid>
                <SettingCard title="Account Setting">
                    <InfoField title="Username">
                        { userData ? userData.username : "" }
                    </InfoField>
                    <InfoField title="Email">
                        { userData ? userData.email : "" }
                    </InfoField>
                    <InfoField title="Joined on">
                        { userData ? new Date(userData.createdAt).toDateString().slice(4) : "" }
                    </InfoField>
                </SettingCard>
                {
                    userData?.provider === "email" && 
                    <SettingCard title="Change password">
                        <ChangePasswordForm/>
                    </SettingCard>
                }
            </SettingsGrid>
            
            <Button small onClick={logOut}>Logout</Button>
        </>
    )
}

export default withAuth(Account)