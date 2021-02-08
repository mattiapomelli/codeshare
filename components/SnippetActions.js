import { useState, useEffect, useRef } from 'react'
import Icon from './Icon'
import DeleteSnippetModal from './DeleteSnippetModal'
import styled from 'styled-components'
import Link from 'next/link'

const ActionsMenu = styled.ul`
	list-style-type: none;
	position: absolute;
	top: 100%;
	border-radius: 0.5em;
	background-color: ${props => props.theme.colors.elements};
	border: 1px solid ${props => props.theme.colors.details};
	padding: 0.1em 0.3em;
	right: 0;
	z-index: 3;
`

const ActionItem = styled.li`
	font-size: 0.8rem;
	font-weight: 400;
	padding: 0.3em 0.5em;
	cursor: pointer;
	background-color: ${props => props.theme.colors.elements};
	border-radius: 0.5em;
	&:hover {
		background-color: ${props => props.theme.colors.accent};
	}
`

const ActionsWrapper = styled.div`
	position: relative;
	margin-bottom: 0.2rem;
	cursor: pointer;
`
const ActionsIcon = styled.div`
	line-height: 1;
	background-color: ${props => props.theme.colors.accent};
	border-radius: 5rem;
	svg {
		display: block;
	}
`

export default function SnippetActions({ id }) {
	const [open, setOpen] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const dropdownRef = useRef()

	useEffect(() => {
		function handleClick(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false)
			}
		}
		window.addEventListener('click', handleClick)

		return () => window.removeEventListener('click', handleClick)
	}, [])

	return (
		<ActionsWrapper ref={dropdownRef}>
			<ActionsIcon>
				<Icon
					icon="arrowdown"
					variant="primary"
					size={20}
					onClick={() => {
						setOpen(open => !open)
					}}
				/>
			</ActionsIcon>
			{open && (
				<ActionsMenu>
					<ActionItem onClick={() => setShowModal(true)}>Delete</ActionItem>
					<Link href={`/editor?edit=${id}`}>
						<ActionItem>Edit</ActionItem>
					</Link>
				</ActionsMenu>
			)}
			{showModal && (
				<DeleteSnippetModal close={() => setShowModal(false)} id={id} />
			)}
		</ActionsWrapper>
	)
}
