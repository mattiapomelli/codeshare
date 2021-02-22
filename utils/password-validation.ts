const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const validatePassword = (password: string) => {
	if (password.length < 8)
		return new Error('Password must be at least 8 characters long')
	if (!password.match(passwordRegex))
		return new Error(
			'Password must have at least one uppercase letter, one lowercase letter and one number'
		)

	return null
}

export default validatePassword
