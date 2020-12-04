import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { signIn } from 'next-auth/client'
import { usePopup } from "../contexts/PopupContext"
import { IconInput } from "../components/Input"
import { Button, FlexButton } from "../components/Button"
import { LoginForm } from "../components/LoginForm"
import Logo from '../components/Logo'
import Link from "next/link"

const Login = () => {
    const router = useRouter()
    const addPopup = usePopup()
    const [credentials, setCredentials] = useState({ email: '', password: ''})

    useEffect(() => {
        if(router.query.error) {
            addPopup(router.query.error)
        }
    }, [router.query])

    const onChange = (e) => {
		setCredentials({...credentials, [e.target.name]: e.target.value})
	}

	const signInWithCredentials = (e) => {
		e.preventDefault()
		signIn('credentials', {
			email: credentials.email,
			password: credentials.password,
		})
    }
    
    const signInWithGitHub = (e) => {
		e.preventDefault()
		signIn('github', { callbackUrl: 'http://localhost:3000/snippets' })
    }

    return (
        <>
        <Logo vertical style={{paddingTop: '3rem'}}/>
        <LoginForm>
            <h3>Login</h3>
            <IconInput
                className="input-field"
                icon="user"
                value={credentials.email}
                onChange={onChange}
                name="email"
                type="text"
                placeholder="email"
            />
            <IconInput
                className="input-field"
                icon="lock"
                value={credentials.password}
                onChange={onChange}
                name="password"
                type="password"
                placeholder="password"
            />
            <Button onClick={signInWithCredentials} type="primary">
                LOGIN
            </Button>
            <hr/>
            <FlexButton onClick={signInWithGitHub} type="inverted" icon="github">
                Sign in with GitHub
            </FlexButton>
            <p>
                Don't have an account? <Link href="/signup"><a>Sign up</a></Link>
            </p>
        </LoginForm>
        </>
    )
}

export default Login