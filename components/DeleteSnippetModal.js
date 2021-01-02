import { useState } from 'react'
import { DELETE_SNIPPET } from '../graphql/mutations'
import { executeQuery } from '../graphql/client'
import { useSession } from 'next-auth/client'
import Modal from './Modal'
import { Button } from './Button'
import Flex from './Flex'
import styled from 'styled-components'

const Buttons = styled(Flex)`
    margin-top: 1rem;
    ${Button} {
        margin: 0.2rem;
    }
`

export default function DeleteSnippetModal({ close, id }) {
    const [session] = useSession()
    const [loading, setLoading] = useState(false)

    const deleteSnippet = async () => {
        try {
            setLoading(true)
            await executeQuery(DELETE_SNIPPET, { id }, session.user.jwt)
            if(window.location.pathname.startsWith("/snippet/")) {
                window.location.href = "/profile"
            } else {
                window.location.reload();
            }
        } catch(err) {
            setLoading(false)
        }
    }

    return (
        <Modal close={close}>
            <div style={{textAlign: 'center'}}>Do you want to delete this snippet?</div>
            <Buttons h="center" flexWrap="wrap">
                <Button small onClick={close}>Cancel</Button>
                <Button small onClick={deleteSnippet} disabled={loading}>Delete</Button>
            </Buttons>
        </Modal>
    )
}
