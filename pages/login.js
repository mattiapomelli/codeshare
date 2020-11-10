import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { signIn } from 'next-auth/client'
import { Form } from "../components/elements/AuthElements"
import { usePopup } from "../contexts/PopupContext"

const Login = () => {
    const router = useRouter()
    const addPopup = usePopup()
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '', password2: ''})

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
        <Form>
            <input value={credentials.email} onChange={onChange} name="email" type="text" placeholder="email"/>
            { !isLogin && <input value={credentials.username} onChange={onChange} name="username" type="text" placeholder="username"/>}
            <input value={credentials.password} onChange={onChange} name="password" type="password" placeholder="password"/>
            { !isLogin && <input value={credentials.password2} onChange={onChange} name="password2" type="password" placeholder="confirm password"/>}
            <button onClick={isLogin ? signInWithCredentials : signUp}> { isLogin ? "Login" : "Signup" } </button>
            <hr/>
            <button onClick={signInWithGitHub}>Continue with github</button>
            

        </Form>
            <button onClick={() => setIsLogin(prev => !prev)}>{ isLogin ? "Signup" : "Login" }</button>
        </>
    )
}

export default Login