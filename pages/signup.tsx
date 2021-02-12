import { useState } from 'react'
import { signIn } from 'next-auth/client'
import { IconInput } from '../components/Input'
import Button from '../components/Button'
import { LoginForm } from '../components/LoginForm'
import Logo from '../components/Logo'
import Popups from '../components/Popup/Popup'
import Link from 'next/link'
import withNoAuth from '../hocs/withNoAuth'
import PageHead from '../components/PageHead'
import Icon from '../components/Icon'

const Signup = () => {
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
		username: '',
		password2: '',
	})
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(false)

	const onChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	const signInWithGitHub = e => {
		e.preventDefault()
		setLoading(true)
		signIn('github', {
			callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/snippets`,
		})
	}

	const signUp = e => {
		e.preventDefault()

		if (credentials.password !== credentials.password2) {
			setMessages(messages => [
				...messages,
				{ type: 'error', text: 'Passwords must match' },
			])
			return
		}

		setLoading(true)
		fetch('/api/register', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: credentials.email.toLowerCase(),
				username: credentials.username,
				password: credentials.password,
			}),
		})
			.then(res => res.json())
			.then(data => {
				setMessages(messages => [
					...messages,
					{ type: data.type || 'error', text: data.message },
				])
				if (data.type == 'success') {
					setCredentials({
						email: '',
						password: '',
						username: '',
						password2: '',
					})
				}
				setLoading(false)
			})
			.catch(() => {
				setLoading(false)
			})
	}

	return (
		<>
			<PageHead title="Sign Up – Codeshare" />

			<Logo vertical style={{ paddingTop: '3rem' }} />
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
					big
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
				<IconInput
					className="input-field"
					icon="lock"
					value={credentials.password2}
					onChange={onChange}
					name="password2"
					type="password"
					placeholder="confirm password"
					iconSize={20}
					big
				/>
				<Button onClick={signUp} variant="primary" disabled={loading}>
					SIGN UP
				</Button>
				<hr />
				<Button
					onClick={signInWithGitHub}
					variant="inverted"
					disabled={loading}
				>
					Sign in with GitHub
					<Icon icon="github" />
				</Button>
				<p>
					Already have an account?{' '}
					<Link href="/login">
						<a>Sign in</a>
					</Link>
				</p>
			</LoginForm>
			<Popups popups={messages} setPopups={setMessages} />
		</>
	)
}

export default withNoAuth(Signup)
