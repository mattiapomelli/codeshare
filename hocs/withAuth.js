import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

const withAuth = (Component) => (props) => {   //pull out component and roles from props and store all the other properties in rest
    const [ session, loading ] = useSession()
    const router = useRouter()

    useEffect(() => {
        if(!loading && !session)
            router.push('/login')
    }, [session, loading])

    if(loading || !session) return null
    //if(!loading && !session) router.push('/login')

    return(
        <Component {...props}/>
    )
}

export default withAuth
