import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { signIn } from 'next-auth/client'
import { usePopup } from "../contexts/PopupContext"
import { InputField } from "../components/elements/BaseElements"
import { Button, FlexButton } from "../components/Button"
import { LoginForm, Logo } from "../components/elements/MainElements"
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
        <Link href="/">
            <Logo v="center" h="center" style={{paddingTop: '3rem'}}>
                <span className="material-icons">change_history</span>
                <h1 className="menu-text">Codeshare</h1>
            </Logo>
        </Link>
        <LoginForm>
            <h3>Login</h3>
            <InputField className="input-field">
                <span className="material-icons">person</span>
                <input value={credentials.email} onChange={onChange} name="email" type="text" placeholder="email"/>
            </InputField>
            <InputField className="input-field">
                <span className="material-icons">lock</span>
                <input value={credentials.password} onChange={onChange} name="password" type="password" placeholder="password"/>
            </InputField>
            <Button onClick={signInWithCredentials} type="primary">
                LOGIN
            </Button>
            <hr/>
            <FlexButton onClick={signInWithGitHub} type="inverted">
                Sign in with GitHub
                <span className="material-icons">facebook</span>
            </FlexButton>
            <p>
                Don't have an account? <Link href="/signup"><a>Sign up</a></Link>
            </p>
        </LoginForm>
        </>
    )
}

export default Login