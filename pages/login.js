import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import { IconInput } from '../components/Input'
import Button from '../components/Button'
import { LoginForm } from '../components/LoginForm'
import Logo from '../components/Logo'
import Popups from '../components/Popup/Popup'
import Link from 'next/link'
import withNoAuth from '../hocs/withNoAuth'
import PageHead from '../components/PageHead'
import { logPageView } from '../utils/analytics'
import Icon from '../components/Icon'

const Login = () => {
	const router = useRouter()
	const [credentials, setCredentials] = useState({ email: '', password: '' })
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (router.query.error) {
			setMessages(messages => [
				...messages,
				{ type: 'error', text: router.query.error.replace('Error: ', '') },
			])
		} else if (router.query.message) {
			setMessages(messages => [
				...messages,
				{ type: 'success', text: router.query.message },
			])
		}
	}, [router.query])

	useEffect(() => {
		logPageView()
	}, [])

	const onChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	const signInWithCredentials = e => {
		e.preventDefault()
		setLoading(true)
		signIn('credentials', {
			email: credentials.email.toLowerCase(),
			password: credentials.password,
			callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/snippets`,
		})
	}

	const signInWithGitHub = e => {
		e.preventDefault()
		setLoading(true)
		signIn('github', {
			callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/snippets`,
		})
	}

	return (
		<>
			<PageHead title="Login – Codeshare" />
			<Logo vertical style={{ paddingTop: '3rem' }} />
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
				<Button
					onClick={signInWithCredentials}
					variant="primary"
					disabled={loading}
				>
					LOGIN
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
					Don't have an account?{' '}
					<Link href="/signup">
						<a>Sign up</a>
					</Link>
					<br />
					<Link href="/resetpassword">
						<a>Forgot your password?</a>
					</Link>
				</p>
			</LoginForm>
			<Popups popups={messages} setPopups={setMessages} />
		</>
	)
}

export default withNoAuth(Login)
