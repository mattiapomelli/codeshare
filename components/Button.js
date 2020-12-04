import styled from "styled-components"
import { Icon } from './Icon/Icon'

export const Button = styled.button`
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 1.4em 2.6em;
    border-radius: 10em;
    cursor: pointer;

    background: ${props => {
        switch(props.type) {
            case "primary":
                return props.theme.colors.primary
            case "inverted":
                return props.theme.colors.text
            default:
                return props.theme.colors.elements
        }
    }};

    color: ${props => {
        switch(props.type) {
            case "primary":
                return "white"
            case "inverted":
                return props.theme.colors.background
            default:
                return props.theme.colors.text
        }
    }}; 
`

const StyledFlexButton = styled(Button)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    svg { margin-left: 5px; }
`

const StyledIconButton = styled(Button)`
    border-radius: 1.2em;
    padding: 0.9em;
    line-height: 1;
`

export const IconButton = ({ icon, ...rest }) => (
    <StyledIconButton {...rest}>
        <Icon name={icon}/>
    </StyledIconButton>
)

export const FlexButton= ({ children, icon, ...rest }) => {
    return (
        <StyledFlexButton {...rest}>
            {children}
            <Icon name={icon} size={12}/>
        </StyledFlexButton>
    )
}