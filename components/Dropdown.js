import { useState, useEffect, useRef } from "react"
import { Button, DropdownMenu } from "./elements/MainElements"

export default function Dropdown({ options, onSelect, value, nullValue }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        function handleClick(event) {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) { setOpen(false); }
        }
        window.addEventListener("click", handleClick)

        return () => window.removeEventListener("click", handleClick)
    }, [])

    const clickHandler = (option) => {
        if(option == nullValue) {
            onSelect(null)
        } else {
            onSelect(option)
        }
        setOpen(false)
    }

    return (
        <DropdownMenu ref={dropdownRef}>
            <Button onClick={() => { setOpen(open => !open)}} flex>
                {value || nullValue}
                <svg viewBox="0 0 14 9" fill="none">
                    <path d="M2 2L7 7L12 2" stroke="#83878E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Button>
            {
                open &&
                <ul>
                    {
                        options.map(option => (
                            <li key={option} onClick={() => clickHandler(option)}>{option}</li>
                        ))
                    }
                </ul>
            }
        </DropdownMenu>
    )
}