import { useState, useEffect, FunctionComponent } from 'react'
import Button from './Button'
import styled, { keyframes } from 'styled-components'

const slideInBottom = keyframes`
  from {
    transform: translateY(100%); 
	}
	to {
    transform: translatey(0);
	}
`

const CookiesContainer = styled.div`
  background-color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.background};
  font-size: 0.8rem;
  border: 1px solid #333;
  border-radius: ${(props) => props.theme.borderRadius};
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

const CookiesPopup: FunctionComponent = () => {
  const [mounted, setMounted] = useState(false)
  const [showCookies, setShowCookies] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && localStorage.getItem('cookies_consent') !== 'true') {
      setShowCookies(true)
    }
  }, [mounted])

  const consentCookies = () => {
    localStorage.setItem('cookies_consent', 'true')
    setShowCookies(false)
  }

  if (!showCookies) return null

  return (
    <CookiesContainer>
      <h3>This website uses cookies</h3>
      <div>
        We use cookies to provide you with a great user experience. By using
        CodeShare, you accept our use of cookies
      </div>
      <Button small onClick={consentCookies} variant="primary">
        Accept
      </Button>
    </CookiesContainer>
  )
}

export default CookiesPopup
