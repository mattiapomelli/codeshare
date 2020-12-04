import styled from "styled-components"

export const DropdownMenu = styled.ul`
    list-style-type: none;
    position: absolute;
    top: 110%;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.colors.elements};
    border: 1px solid ${props => props.theme.colors.details};
    padding: 0.5em;
    z-index: 3;
`

export const DropdownItem = styled.li`
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.7em 2.6em;
    cursor: pointer;
    background-color: ${props => props.theme.colors.elements};
    border-radius: ${props => props.theme.borderRadius};
    &:hover { background-color: ${props => props.theme.colors.details}; }
`

export const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
`