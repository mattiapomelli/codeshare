import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Icon } from './Icon/Icon'

const ModalWrapper = styled.div`
    position: fixed;
    z-index: 10;
    padding-top: 120px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
`

const ModalContent = styled.div`
    background-color: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius};
    margin: auto;
    padding: 2rem;
    width: 90%;
    max-width: 800px;
    position: relative;
`

const CloseIcon = styled(Icon)`
    position: absolute;
    right: 0.7rem;
    top: 0.7rem;
    cursor: pointer;
`

export default function Modal({ children, close }) {
    const modalRef = useRef()

    useEffect(() => {
        function handleClick(event) {
            if(modalRef.current && !modalRef.current.contains(event.target)) {
                close()
            }
        }

        window.addEventListener('click', handleClick)
        
        return () => window.removeEventListener('click', handleClick)
    }, [])

    return (
        <ModalWrapper>
            <ModalContent ref={modalRef}>
                <CloseIcon name="cross" type="primary" size={18} onClick={close}/>
                { children }
            </ModalContent>  
        </ModalWrapper>
    )
}
