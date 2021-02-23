import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function withAuth<P>(
  WrappedComponent: React.ComponentType<P> & { layout?: React.ReactNode }
) {
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

  // ComponentWithAuth.getLayout = WrappedComponent.getLayout
  ComponentWithAuth.layout = WrappedComponent.layout

  return ComponentWithAuth
}

export default withAuth
