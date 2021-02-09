import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
	const ComponentWithAuth = (props: P) => {
		const [session, loading] = useSession()
		const router = useRouter()

		useEffect(() => {
			if (!loading && !session) router.push('/login')
		}, [session, loading])

		if (loading || !session) return null

		return <WrappedComponent {...props} />
	}

	ComponentWithAuth.displayName = `WithAuth(${getDisplayName(
		WrappedComponent
	)})`

	return ComponentWithAuth
}

export default withAuth
