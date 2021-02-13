import { useState } from 'react'
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
import useForm from '../hooks/use-form'

const Signup = () => {
	const { formData, handleInputChange, handleSubmit, resetForm } = useForm({
		email: '',
		username: '',
		password: '',
		password2: '',
	})
	const [loading, setLoading] = useState(false)
	const addNotification = useNotification()

	const signInWithGitHub = (e) => {
		e.preventDefault()
		setLoading(true)
		signIn('github', {
			callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/snippets`,
		})
	}

	const signUp = (data) => {
		if (data.password !== data.password2) {
			addNotification({ type: 'error', content: 'Passwords must match' })
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
				email: data.email.toLowerCase(),
				username: data.username,
				password: data.password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				addNotification({ type: data.type || 'error', content: data.message })
				if (data.type == 'success') {
					resetForm()
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
			<LoginForm onSubmit={handleSubmit(signUp)}>
				<h3>Sign up</h3>
				<IconInput
					className="input-field"
					icon="user"
					value={formData.email}
					onChange={handleInputChange}
					name="email"
					type="text"
					placeholder="email"
					iconSize={20}
					big
				/>
				<IconInput
					className="input-field"
					icon="user"
					value={formData.username}
					onChange={handleInputChange}
					name="username"
					type="text"
					placeholder="username"
					iconSize={20}
					big
				/>
				<IconInput
					className="input-field"
					icon="lock"
					value={formData.password}
					onChange={handleInputChange}
					name="password"
					type="password"
					placeholder="password"
					iconSize={20}
					big
				/>
				<IconInput
					className="input-field"
					icon="lock"
					value={formData.password2}
					onChange={handleInputChange}
					name="password2"
					type="password"
					placeholder="confirm password"
					iconSize={20}
					big
				/>
				<Button type="submit" variant="primary" disabled={loading}>
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
					Already have an account?
					<Link href="/login">
						<a> Sign in</a>
					</Link>
				</p>
			</LoginForm>
		</>
	)
}

export default withNoAuth(Signup)
