import { useState } from 'react'
import { Button } from './Button'
import styled , { keyframes }from 'styled-components'

const slideInBottom = keyframes`
    from {
	    transform: translateY(100%); 
	}
	to {
	    transform: translatey(0);
	}
`

const CookiesContainer = styled.div`
    background-color: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.background};
    font-size: 0.8rem;
    border: 1px solid #333;
    border-radius: ${props => props.theme.borderRadius};
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.8rem 1.8rem;
    width: 90%;
    max-width: 400px;
    animation: ${slideInBottom} 1s;
    ${Button} {
        float: right;
        padding: 0.7em 2.2em;
    }
    
`

export default function CookiesPopup() {
    const [acconsented, setAcconsented] = useState(() => {
        return localStorage.getItem('cookies_consent') === "true"
    })

    const consentCookies = () => {
        localStorage.setItem('cookies_consent', 'true')
        setAcconsented(true)
    } 

    if(acconsented) return null

    return (
        <CookiesContainer dir="column" v="center" flexWrap="wrap" h="center">
            <h3>This website uses cookies</h3>
            <div>We use cookies to ensure that we give you the best experience on our website to personalise content</div>
            <Button small onClick={consentCookies} type="primary">Accept</Button>
        </CookiesContainer>
    )
}
