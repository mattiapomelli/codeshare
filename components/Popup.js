import styled, { keyframes } from 'styled-components'

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

const slideInLeft = keyframes`
    from {
		transform: translateX(-100%);	
	}
	to {
		transform: translateX(0);
	}
`

export const Popup = styled.div`
    top: 12px;
    right: 12px;
    background: #fff;
    transition: .3s ease;
    transition: transform .6s ease-in-out;
	animation: ${slideInRight} .7s;
	position: relative;
	overflow: hidden;
	padding: 30px;
	margin-bottom: 15px;
	width: 300px;
	border-radius: 3px 3px 3px 3px;
	box-shadow: 0 0 10px #999;
	color: #000;    
`
