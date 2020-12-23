import { useSession, signOut } from 'next-auth/client'
import { Button } from '../components/Button'
import { H2, Label } from '../components/Typography'
import withAuth from '../hocs/withAuth'
import PageHead from '../components/PageHead'
import { Input } from '../components/Input'
import Flex from '../components/Flex'
import styled from 'styled-components'

const Settings = styled(Flex)`
    margin-top: 1.5rem;
    > * {
        margin-bottom: 1.5rem;
    }
`

const Card = styled.div`
    background-color: ${props => props.theme.colors.elements};
    padding: 1rem;
    border-radius: 0.8rem;
    width: 100%;
    max-width: 500px;
`


const PasswordCard = styled(Card)`
    ${Input} {
        margin-bottom: 0.6rem;
        width: 100%;
        background-color: ${props => props.theme.colors.accent};
    }
    ${Button} {
        margin-top: 1rem;
    }
`

const Field = styled.div`
    margin-bottom: 1rem;
    span { margin-left: 5px; font-weight: 300; }
`

const InfoField = ({ children, title}) => (
    <Field>
        <Label>{ title} </Label>
        <span>{ children}</span>
    </Field>
)

function Account() {
    const [session] = useSession()

    return (
        <> 
            <PageHead title="Account – Codeshare"/>

            <H2>Account</H2>

            <Settings h="flex-start" dir="column" stretch v="flex-start">
                <Label>Account Settings</Label>
                <Card>
                    <InfoField title="Username">{session.user.username}</InfoField>
                    <InfoField title="Email">mattiapomelli@gmail.com</InfoField>
                    <InfoField title="Joined on">21-07-2020</InfoField>
                </Card>
                <Label>Change password</Label>
                <PasswordCard as="form">
                    <Label small>Current password</Label>
                    <Input type="password" small/>
                    <Label small>New password</Label>
                    <Input type="password" small/>
                    {/* <Label small>Confirm new password</Label>
                    <Input type="password" small/> */}
                    <Button small onClick={signOut} type="primary">Change</Button>
                </PasswordCard>
            </Settings>
            
            <Button small onClick={signOut}>Logout</Button>

        </>
    )
}

export default withAuth(Account)