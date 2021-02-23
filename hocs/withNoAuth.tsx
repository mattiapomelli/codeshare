import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function withNoAuth<P>(
  WrappedComponent: React.ComponentType<P> & { layout?: React.ReactNode }
) {
  const ComponentWithNoAuth = (props: P) => {
    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
      if (!loading && session) router.push('/snippets')
    }, [session, loading])

    return <WrappedComponent {...props} />
  }

  ComponentWithNoAuth.displayName = `WithNoAuth(${getDisplayName(
    WrappedComponent
  )})`

  ComponentWithNoAuth.layout = WrappedComponent.layout

  return ComponentWithNoAuth
}

export default withNoAuth
