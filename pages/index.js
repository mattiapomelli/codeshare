import { useSession, signOut } from 'next-auth/client'
import Link from "next/link"

export default function Home() {
	const [session] = useSession()
	
	const handleLogout = (e) => {
		e.preventDefault()
		signOut()
	}

	return (
		<div>
			<div>CodeShare</div>
			{session? (
				<>
					<img src={session.user.image}/>
					<a href="#" onClick={handleLogout}>Logout</a>
				</>
				) : (
				<Link href="/login">Login</Link>
			)}
		</div>
	)
}
