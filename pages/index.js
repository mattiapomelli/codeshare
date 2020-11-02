import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from 'next-auth/client'

export default function Home() {
	const [session] = useSession()
	const [credentials, setCredentials] = useState({ email: '', password: ''})

	useEffect(() => {
		console.log(session)
	  }, [session])
	
	  const handleLogin = (e) => {
		e.preventDefault()
		signIn('github')
	  }
	
	  const handleLogout = (e) => {
		e.preventDefault()
		signOut()
	  }

	  const onChange = (e) => {
		setCredentials({...credentials, [e.target.name]: e.target.value})
	  }

	const onSubmit = (e) => {
		e.preventDefault()
		signIn('credentials', {
			email: credentials.email,
			password: credentials.password,
		})
	} 

	return (
		<div>
			<div>CodeShare</div>
			{session? (
				<>
					<img src={session.user.image} className="user"/>
					<a href="#" onClick={handleLogout} className="logout">Logout</a>
				</>
				) : (
				<a href="#" onClick={handleLogin} className="logout">Login</a>
			)}


			<form>
				<input value={credentials.email} onChange={onChange} name="email" type="text"/>
				<input value={credentials.password} onChange={onChange} name="password" type="password"/>
				<button onClick={onSubmit}>Login</button>
			</form>
		</div>
	)
}
