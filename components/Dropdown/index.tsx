import { useState, useEffect, useRef, FunctionComponent } from 'react'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { DropdownWrapper, DropdownMenu, DropdownItem } from './styles'

interface DropdownProps {
	options: string[]
	value: string
	as?: string
	onSelect: (value: string) => void
	right?: boolean
}

const Dropdown: FunctionComponent<DropdownProps> = ({
	options,
	onSelect,
	value,
	right,
}) => {
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

	const clickHandler = (option) => {
		onSelect(option)
		setOpen(false)
	}

	const toggle = () => {
		setOpen((open) => !open)
	}

	return (
		<DropdownWrapper ref={dropdownRef}>
			<Button onClick={toggle} small as="span">
				{value}
				<Icon icon="arrowdown" variant="primary" size={12} />
			</Button>
			{open && (
				<DropdownMenu right={right}>
					{options.map((option) => (
						<DropdownItem key={option} onClick={() => clickHandler(option)}>
							{option}
						</DropdownItem>
					))}
				</DropdownMenu>
			)}
		</DropdownWrapper>
	)
}

export default Dropdown
