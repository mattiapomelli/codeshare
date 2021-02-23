import { useState, FunctionComponent } from 'react'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { DropdownWrapper, DropdownMenu, DropdownItem } from './styles'
import useOnClickOutside from '@/hooks/use-click-outside'

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
  const dropdownRef = useOnClickOutside<HTMLDivElement>(() => setOpen(false))

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
