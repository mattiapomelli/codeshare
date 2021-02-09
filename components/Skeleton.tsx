import styled from 'styled-components'

interface Props {
	h?: string
	w?: string
	mw?: string
}

export const Skeleton = styled.div<Props>`
	border-radius: ${props => props.theme.borderRadius};
	display: block;
	height: ${props => props.h || '100%'};
	width: ${props => props.w || '100%'};
	max-width: ${props => props.mw || '100%'};
	background: linear-gradient(
		-90deg,
		${props => props.theme.colors.elements} 0%,
		${props => props.theme.colors.accent} 50%,
		${props => props.theme.colors.elements} 100%
	);
	background-size: 400% 400%;
	animation: pulse 1.2s ease-in-out infinite;
	margin-bottom: 5px;
	@keyframes pulse {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: -135% 0%;
		}
	}
`
