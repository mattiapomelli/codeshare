import { useState, useEffect, useRef } from 'react'
import Button from '../Button'
import Icon from '../Icon'
import { DropdownWrapper, DropdownMenu, DropdownItem } from './style'

interface DropdownProps {
	options: string[]
	value: string
	nullValue?: string
	as?: string
	onSelect: (string) => void
	right?: boolean
	minWidth?: string
}

export default function Dropdown({
	options,
	onSelect,
	value,
	nullValue,
	right,
}: DropdownProps) {
	const [open, setOpen] = useState(false)
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

	const clickHandler = option => {
		if (option == nullValue) {
			onSelect(null)
		} else {
			onSelect(option)
		}
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
				{value || nullValue}
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
