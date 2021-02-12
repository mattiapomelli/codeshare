import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import { IconInput } from '../components/Input'
import Button from '../components/Button'
import { LoginForm } from '../components/LoginForm'
import Logo from '../components/Logo'
import Link from 'next/link'
import withNoAuth from '../hocs/withNoAuth'
import PageHead from '../components/PageHead'
import Icon from '../components/Icon'
import useNotification from '../hooks/use-notification'

const Login = () => {
	const router = useRouter()
	const [credentials, setCredentials] = useState({ email: '', password: '' })
	const [loading, setLoading] = useState(false)
	const addNotification = useNotification()

	useEffect(() => {
		if (router.query.error) {
			const errors = router.query.error
			const errorMsg =
				typeof errors === 'string'
					? errors.replace('Error: ', '')
					: errors[0].replace('Error: ', '')

			addNotification({ type: 'error', content: errorMsg })
		} else if (router.query.message) {
			addNotification({
				type: 'success',
				content: router.query.message as string,
			})
		}
	}, [router.query])

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
		</>
	)
}

export default withNoAuth(Login)
