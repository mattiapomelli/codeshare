import { useState } from 'react'
import { IconInput } from '../components/Input'
import Button from '../components/Button'
import { LoginForm } from '../components/LoginForm'
import Logo from '../components/Logo'
import withNoAuth from '../hocs/withNoAuth'
import useNotification from '../hooks/use-notification'
import useForm from '../hooks/use-form'

const ForgotPassword = () => {
	const { formData, handleInputChange, handleSubmit, resetForm } = useForm({
		email: '',
	})
	const [loading, setLoading] = useState(false)
	const addNotification = useNotification()

	const sendResetPassword = (data) => {
		setLoading(true)
		fetch('/api/retrievepassword', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email.toLowerCase(),
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
			<Logo vertical style={{ paddingTop: '3rem' }} />
			<LoginForm onSubmit={handleSubmit(sendResetPassword)}>
				<h3>Reset Password</h3>
				<IconInput
					className="input-field"
					icon="email"
					value={formData.email}
					onChange={handleInputChange}
					name="email"
					type="text"
					placeholder="email"
					iconSize={20}
					big
				/>
				<Button type="submit" variant="primary" disabled={loading}>
					Reset Password
				</Button>
				<p>
					Well'send password reset instructions to the email address associated
					with your account
				</p>
			</LoginForm>
		</>
	)
}

export default withNoAuth(ForgotPassword)
