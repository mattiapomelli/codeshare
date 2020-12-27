import { useEffect } from 'react'
import Flex from '../components/Flex'
import styled from 'styled-components'
import { H2 } from '../components/Typography'
import Logo from '../components/Logo'
import { logPageView } from '../utils/analytics'

const FlexContainer = styled(Flex)`
    height: 70vh;
`

export default function Custom404() {

    useEffect(()=>{
        logPageView()
    },[])
    
    return (
        <FlexContainer v="center" h="center" dir="column">
            <Logo
                noText
                style={{marginBottom: '3rem'}}
            />
            <H2>404</H2>
            <h3>Page Not Found</h3>
        </FlexContainer>
    )
}