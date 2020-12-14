import styled, { keyframes } from 'styled-components'
import Flex from '../Flex'

export const PopupsContainer = styled.div`
    position: fixed;
    top: 12px;
	right: 12px;
`

const slideInRight = keyframes`
    from {
	  transform: translateX(100%); 
	}
	to {
	    transform: translateX(0);
	}
`

export const Popup = styled(Flex)`
    top: 0.7rem;
    right: 0.7rem;
    font-size: 0.9rem;
    background: ${props => props.theme.colors.text};
	animation: ${slideInRight} .7s;
	position: relative;
	padding: 1.2rem 1.4rem 1.2rem 1rem;
	margin-bottom: 0.8rem;
	width: 19rem;
	border-radius: 10px;
    color: ${props => props.theme.colors.background};  
    line-height: 1;
    > svg { margin-right: 10px }
`
export const CloseButton = styled.div`
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    border-radius: 5rem;
    padding: 0.2em;
    cursor: pointer;
    svg { display: block; }
    &:hover { 
        background-color: #ddd;
    }
`