import { useState } from 'react'
import Input from './Input'
import { Label } from './Typography'
import Button from './Button'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import useNotification from '../hooks/use-notification'

const PasswordForm = styled.form`
	${Input} {
		margin-bottom: 0.6rem;
		width: 100%;
		background-color: ${props => props.theme.colors.accent};
	}
	${Button} {
		margin-top: 0.6rem;
	}
`

export default function ChangePasswordForm() {
	const [session] = useSession()
	const [passwords, setPasswords] = useState({
		current: '',
		newPassword: '',
		newPassword2: '',
	})
	const [loading, setLoading] = useState(false)
	const addNotification = useNotification()

	const onChange = e => {
		setPasswords({ ...passwords, [e.target.name]: e.target.value })
	}

	const changePassword = e => {
		e.preventDefault()

		if (passwords.newPassword !== passwords.newPassword2) {
			addNotification({ type: 'error', content: 'Passwords must match' })
			return
		}

		setLoading(true)
		fetch('/api/changepassword', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: session.user.id,
				oldPassword: passwords.current,
				newPassword: passwords.newPassword,
			}),
		})
			.then(res => res.json())
			.then(data => {
				addNotification({ type: data.type || 'error', content: data.message })
				if (data.type == 'success') {
					setPasswords({ current: '', newPassword: '', newPassword2: '' })
				}
				setLoading(false)
			})
			.catch(() => {
				setLoading(false)
			})
	}

	return (
		<PasswordForm>
			<Label small>Current password</Label>
			<Input
				type="password"
				small
				name="current"
				value={passwords.current}
				onChange={onChange}
			/>
			<Label small>New password</Label>
			<Input
				type="password"
				small
				name="newPassword"
				value={passwords.newPassword}
				onChange={onChange}
			/>
			<Label small>Confirm password</Label>
			<Input
				type="password"
				small
				name="newPassword2"
				value={passwords.newPassword2}
				onChange={onChange}
			/>
			<Button
				small
				onClick={changePassword}
				variant="primary"
				disabled={loading}
			>
				Change
			</Button>
		</PasswordForm>
	)
}
