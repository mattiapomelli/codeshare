import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { signIn } from 'next-auth/client'
import { IconInput } from "../components/Input"
import { Button, FlexButton } from "../components/Button"
import { LoginForm } from "../components/LoginForm"
import Logo from '../components/Logo'
import Popups from '../components/Popup/Popup'
import Link from "next/link"
import withNoAuth from '../hocs/withNoAuth'
import PageHead from '../components/PageHead'

const Login = () => {
    const router = useRouter()
    const [credentials, setCredentials] = useState({ email: '', password: ''})
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if(router.query.error) {
            setMessages(messages => [...messages, { type: 'error', text: router.query.error }])
        } else if(router.query.message) {
            setMessages(messages => [...messages, { type: 'success', text: router.query.message }])
        }
    }, [router.query])

    const onChange = (e) => {
		setCredentials({...credentials, [e.target.name]: e.target.value})
	}

	const signInWithCredentials = (e) => {
		e.preventDefault()
		signIn('credentials', {
			email: credentials.email.toLowerCase(),
            password: credentials.password,
            callbackUrl: `${NEXT_AUTH_URL}/snippets`
		}).then((res) => {
            if(res && res.error) {
                setMessages(messages => [...messages, { type: 'error', text: decodeURIComponent(res.error)}])
            }
        })
    }
    
    const signInWithGitHub = (e) => {
		e.preventDefault()
		signIn('github', { callbackUrl: `${NEXT_AUTH_URL}/snippets` })
    }

    return (
        <>
        <PageHead title="Login – Codeshare"/>
        <Logo vertical style={{paddingTop: '3rem'}}/>
        <LoginForm>
            <h3>Log in</h3>
            <IconInput
                className="input-field"
                icon="user"
                value={credentials.email}
                onChange={onChange}
                name="email"
                type="text"
                placeholder="email"
                iconSize={20}
                big
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
                big
            />
            <Button onClick={signInWithCredentials} type="primary">
                LOGIN
            </Button>
            <hr/>
            <FlexButton onClick={signInWithGitHub} type="inverted" icon="github">
                Sign in with GitHub
            </FlexButton>
            <p>
                Don't have an account? <Link href="/signup"><a>Sign up</a></Link><br/>
                <Link href="/resetpassword"><a>Forgot your password?</a></Link>
            </p>
        </LoginForm>
        <Popups popups={messages} setPopups={setMessages}/>
        </>
    )
}

export default withNoAuth(Login)