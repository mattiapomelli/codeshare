import { useState } from 'react'
import { IconInput } from '../components/Input'
import Button from '../components/Button'
import { LoginForm } from '../components/LoginForm'
import Logo from '../components/Logo'
import Popups from '../components/Popup/Popup'
import withNoAuth from '../hocs/withNoAuth'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(false)

	const sendResetPassword = e => {
		e.preventDefault()
		setLoading(true)
		fetch('/api/retrievepassword', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
			}),
		})
			.then(res => res.json())
			.then(data => {
				setMessages(messages => [
					...messages,
					{ type: data.type || 'error', text: data.message },
				])
				if (data.type == 'success') {
					setEmail('')
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
			<LoginForm>
				<h3>Reset Password</h3>
				<IconInput
					className="input-field"
					icon="email"
					value={email}
					onChange={e => {
						setEmail(e.target.value)
					}}
					name="email"
					type="text"
					placeholder="email"
					iconSize={20}
					big
				/>
				<Button
					onClick={sendResetPassword}
					variant="primary"
					disabled={loading}
				>
					Reset Password
				</Button>
				<p>
					Well'send password reset instructions to the email address associated
					with your account
				</p>
			</LoginForm>
			<Popups popups={messages} setPopups={setMessages} />
		</>
	)
}

export default withNoAuth(ForgotPassword)
