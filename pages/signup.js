import { useState } from "react"
import { signIn } from 'next-auth/client'
import { IconInput } from "../components/Input"
import { Button, FlexButton } from "../components/Button"
import { LoginForm } from "../components/LoginForm"
import Logo from '../components/Logo'
import Popups from '../components/Popup/Popup'
import Link from "next/link"
import withNoAuth from '../hocs/withNoAuth'
import Head from 'next/head'

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '', password2: ''})
    const [messages, setMessages] = useState([])

    const onChange = (e) => {
		setCredentials({...credentials, [e.target.name]: e.target.value})
	}
    
    const signInWithGitHub = (e) => {
		e.preventDefault()
		signIn('github', { callbackUrl: 'http://localhost:3000/snippets' })
    }
    
    const signUp = (e) => {
        e.preventDefault();
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: credentials.email,
                username: credentials.username,
                password: credentials.password
            })
        })
        .then(res => res.json())
        .then(data => {
            setMessages(messages => [...messages, { type: 'error', text: data.message}])
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
        <Head>
            <title>Sign Up – Codeshare</title>
        </Head>
        <Logo vertical style={{paddingTop: '3rem'}}/>
        <LoginForm>
            <h3>Sign up</h3>
            <IconInput
                className="input-field"
                icon="user"
                value={credentials.email}
                onChange={onChange}
                name="email"
                type="text"
                placeholder="email"
                iconSize={20}
            />
            <IconInput
                className="input-field"
                icon="user"
                value={credentials.username}
                onChange={onChange}
                name="username"
                type="text"
                placeholder="username"
                iconSize={20}
            />
            <IconInput
                className="input-field"
                icon="lock"
                value={credentials.password}
                onChange={onChange}
                name="password"
                type="password"
                placeholder="password"
                iconSize={20}
            />
            <IconInput
                className="input-field"
                icon="lock"
                value={credentials.password2}
                onChange={onChange}
                name="password2"
                type="password"
                placeholder="confirm password"
                iconSize={20}
            />
            <Button onClick={signUp} type="primary">
                SIGN UP
            </Button>
            <hr/>
            <FlexButton onClick={signInWithGitHub} type="inverted" icon="github">
                Sign in with GitHub
            </FlexButton>
            <p>
                Already have an account? <Link href="/login"><a>Sign in</a></Link>
            </p>
        </LoginForm>
        <Popups popups={messages} setPopups={setMessages}/>
        </>
    )
}

export default withNoAuth(Login)