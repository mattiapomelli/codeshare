import { useState } from 'react'
import Input from './Input'
import { Label } from './Typography'
import Button from './Button'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import useNotification from '@/hooks/use-notification'
import useForm from '@/hooks/use-form'

const PasswordForm = styled.form`
	${Input} {
		margin-bottom: 0.6rem;
		width: 100%;
		background-color: ${(props) => props.theme.colors.accent};
	}
	${Button} {
		margin-top: 0.6rem;
	}
`

export default function ChangePasswordForm() {
	const [session] = useSession()
	const { formData, handleInputChange, handleSubmit, resetForm } = useForm({
		current: '',
		newPassword: '',
		newPassword2: '',
	})
	const [loading, setLoading] = useState(false)
	const addNotification = useNotification()

	const changePassword = async (data) => {
		if (data.newPassword !== data.newPassword2) {
			addNotification({ type: 'error', content: 'Passwords must match' })
			return
		}
		setLoading(true)

		try {
			const res = await fetch('/api/change-password', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: session.user.id,
					oldPassword: data.current,
					newPassword: data.newPassword,
				}),
			})

			const result = await res.json()

			addNotification({ type: result.type || 'error', content: result.message })
			if (result.type == 'success') {
				resetForm()
			}
		} catch (err) {
			addNotification({ type: 'error', content: 'Something went wrong' })
		} finally {
			setLoading(false)
		}
	}

	return (
		<PasswordForm onSubmit={handleSubmit(changePassword)}>
			<Label small>Current password</Label>
			<Input
				type="password"
				small
				name="current"
				value={formData.current}
				onChange={handleInputChange}
			/>
			<Label small>New password</Label>
			<Input
				type="password"
				small
				name="newPassword"
				value={formData.newPassword}
				onChange={handleInputChange}
			/>
			<Label small>Confirm password</Label>
			<Input
				type="password"
				small
				name="newPassword2"
				value={formData.newPassword2}
				onChange={handleInputChange}
			/>
			<Button type="submit" small variant="primary" disabled={loading}>
				Change
			</Button>
		</PasswordForm>
	)
}
