import { useState, useEffect, useRef } from 'react'
import { FlexButton } from '../Button'
import { DropdownWrapper, DropdownMenu, DropdownItem } from './DropdownElements'

export default function Dropdown({
  options,
  onSelect,
  value,
  nullValue,
  as,
  right,
  minWidth,
}) {
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

  const clickHandler = (option) => {
    if (option == nullValue) {
      onSelect(null)
    } else {
      onSelect(option)
    }
    setOpen(false)
  }

  return (
    <DropdownWrapper ref={dropdownRef}>
      <FlexButton
        onClick={() => {
          setOpen((open) => !open)
        }}
        icon="arrowdown"
        small
        as={as}
        iconType="primary"
        minWidth={minWidth}
      >
        {value || nullValue}
      </FlexButton>
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
