import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import { IconInput } from '@/components/Input'
import Button from '@/components/Button'
import { LoginForm } from '@/components/LoginForm'
import Link from 'next/link'
import withNoAuth from '@/hocs/withNoAuth'
import PageHead from '@/components/PageHead'
import Icon from '@/components/Icon'
import useNotification from '@/hooks/use-notification'
import useForm from '@/hooks/use-form'
import BlankLayout from '@/layouts/BlankLayout'

const LoginPage = () => {
	const router = useRouter()
	const { formData, handleInputChange, handleSubmit } = useForm({
		email: '',
		password: '',
	})
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
	}, [router.query, addNotification])

	const signInWithCredentials = (data) => {
		setLoading(true)
		signIn('credentials', {
			email: data.email.toLowerCase(),
			password: data.password,
			callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/snippets`,
		})
	}

	const signInWithGitHub = (e) => {
		e.preventDefault()
		setLoading(true)
		signIn('github', {
			callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/snippets`,
		})
	}

	return (
		<>
			<PageHead title="Login – Codeshare" />
			<LoginForm onSubmit={handleSubmit(signInWithCredentials)}>
				<h3>Log in</h3>
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
					icon="lock"
					value={formData.password}
					onChange={handleInputChange}
					name="password"
					type="password"
					placeholder="password"
					iconSize={20}
					big
				/>
				<Button type="submit" variant="primary" disabled={loading}>
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
					Don't have an account?
					<Link href="/signup">
						<a> Sign up</a>
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

LoginPage.layout = BlankLayout

export default withNoAuth(LoginPage)
