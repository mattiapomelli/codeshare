import { useSession, signOut } from 'next-auth/client'
import { Button } from '../components/Button'
import { H2, Label } from '../components/Typography'
import withAuth from '../hocs/withAuth'
import PageHead from '../components/PageHead'
import { Input } from '../components/Input'

function Account() {
    const [session] = useSession()

    return (
        <> 
            <PageHead title="Account – Codeshare"/>

            { session && <H2>{session.user.username}</H2> }

            <Label>Change password</Label>
            <Input placeholder="Email"/>


            <Button small onClick={signOut}>Logout</Button>
        </>
    )
}

export default withAuth(Account)