import { useState } from "react"
import { signIn } from 'next-auth/client'
import { Form } from "../components/elements/AuthElements"

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '', password2: ''})

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
        console.log(credentials)
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
        }).then((res) => res.json())
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
            <button onClick={() => setIsLogin(!isLogin)}>{ isLogin ? "Login" : "Signup" }</button>
        </>
    )
}

export default Login