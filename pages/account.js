import { useState } from 'react'
import { useSession, signOut } from 'next-auth/client'
import { Button } from '../components/Button'
import { H2, Label } from '../components/Typography'
import withAuth from '../hocs/withAuth'
import PageHead from '../components/PageHead'
import { Input } from '../components/Input'
import Flex from '../components/Flex'
import styled from 'styled-components'
import Popups from '../components/Popup/Popup'

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
    const [passwords, setPasswords] = useState({ current: '', current2: '', newPassword: ''})
    const [messages, setMessages] = useState([])
    
    const onChange = (e) => {
		setPasswords({...passwords, [e.target.name]: e.target.value})
    }
    
    const changePassword = (e) => {
        e.preventDefault()
        fetch('/api/changepassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                id: session.user.id,
                oldPassword: passwords.current,
                newPassword: passwords.newPassword,
            })
        })
        .then(res => res.json())
        .then(data => {
            setMessages(messages => [...messages, { type: data.type || 'error', text: data.message}])
            if(data.type == 'success') {
                setPasswords({ current: '', current2: '', newPassword: ''})
            }
        }).catch(err => {
            console.log(err)
        })
    }

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
                    <Input
                        type="password"
                        small
                        name="current"
                        value={passwords.current}
                        onChange={onChange}
                    />
                    <Label small>New password</Label>
                    <Input
                        type="password"
                        small
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={onChange}
                    />
                    {/* <Label small>Confirm new password</Label>
                    <Input type="password" small/> */}
                    <Button small onClick={changePassword} type="primary">Change</Button>
                </PasswordCard>
            </Settings>
            
            <Button small onClick={signOut}>Logout</Button>
            <Popups popups={messages} setPopups={setMessages}/>
        </>
    )
}

export default withAuth(Account)