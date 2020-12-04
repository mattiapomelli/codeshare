import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { signIn } from 'next-auth/client'
import { usePopup } from "../contexts/PopupContext"
import { IconInput } from "../components/Input"
import { Button, FlexButton } from "../components/Button"
import { LoginForm, Logo } from "../components/elements/MainElements"
import Link from "next/link"

const Login = () => {
    const router = useRouter()
    const addPopup = usePopup()
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '', password2: ''})

    useEffect(() => {
        if(router.query.error) {
            addPopup(router.query.error)
        }
    }, [router.query])

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
        .then(data => alert(data.message))
        .catch(err => console.log(err))
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
            <h3>Sign up</h3>
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
                icon="user"
                value={credentials.username}
                onChange={onChange}
                name="username"
                type="text"
                placeholder="username"
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
            <IconInput
                className="input-field"
                icon="lock"
                value={credentials.password2}
                onChange={onChange}
                name="password2"
                type="password"
                placeholder="confirm password"
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
        </>
    )
}

export default Login