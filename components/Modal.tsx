import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import Flex from './Flex'

const ModalWrapper = styled(Flex)`
	position: fixed;
	z-index: 10;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
`

const ModalContent = styled.div`
	background-color: ${props => props.theme.colors.background};
	border-radius: ${props => props.theme.borderRadius};
	/* margin: auto; */
	margin-bottom: 4rem;
	padding: 2rem 2.3rem;
	width: auto;
	max-width: 90%;
	position: relative;
`

const CloseIcon = styled(Icon)`
	position: absolute;
	right: 0.7rem;
	top: 0.7rem;
	cursor: pointer;
`

interface Props {
	children: React.ReactNode
	close: () => void
}

export default function Modal({ children, close }: Props) {
	const modalRef = useRef<HTMLDivElement>()

	useEffect(() => {
		function handleClick(event) {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				close()
			}
		}

		window.addEventListener('click', handleClick)

		return () => window.removeEventListener('click', handleClick)
	}, [close])

	return (
		<ModalWrapper v="center" h="center">
			<ModalContent ref={modalRef}>
				<CloseIcon icon="cross" variant="primary" size={18} onClick={close} />
				{children}
			</ModalContent>
		</ModalWrapper>
	)
}
