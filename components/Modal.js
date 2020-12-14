import styled from 'styled-components'

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

export default function Modal({ children }) {

    return (
        <ModalWrapper>
            <ModalContent>
                { children }
            </ModalContent>  
        </ModalWrapper>
    )
}
