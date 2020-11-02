import { useEffect } from "react"
import { useSession, signIn, signOut } from 'next-auth/client'

export default function Home() {
	const [session] = useSession()

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
		</div>
	)
}
