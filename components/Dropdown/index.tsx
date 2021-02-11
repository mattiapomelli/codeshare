import { useState, useEffect, useRef } from 'react'
import Button from '../Button'
import Icon from '../Icon'
import { DropdownWrapper, DropdownMenu, DropdownItem } from './styles'

interface DropdownProps {
	options: string[]
	value: string
	as?: string
	onSelect: (value: string) => void
	right?: boolean
}

export default function Dropdown({
	options,
	onSelect,
	value,
	right,
}: DropdownProps) {
	const [open, setOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>()

	useEffect(() => {
		function handleClick(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false)
			}
		}

		window.addEventListener('click', handleClick)

		return () => window.removeEventListener('click', handleClick)
	}, [])

	const clickHandler = option => {
		onSelect(option)
		setOpen(false)
	}

	return (
		<DropdownWrapper ref={dropdownRef}>
			<Button
				onClick={() => {
					setOpen(open => !open)
				}}
				small
				as="span"
			>
				{value}
				<Icon icon="arrowdown" variant="primary" size={12} />
			</Button>
			{open && (
				<DropdownMenu right={right}>
					{options.map(option => (
						<DropdownItem key={option} onClick={() => clickHandler(option)}>
							{option}
						</DropdownItem>
					))}
				</DropdownMenu>
			)}
		</DropdownWrapper>
	)
}
