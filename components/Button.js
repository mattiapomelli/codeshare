import styled from "styled-components"
import { Icon } from './Icon/Icon'

export const Button = styled.button`
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 500;
    padding: ${props => props.padding ? props.padding : props.small ? "1.1em 2.6em" : "1.4em 2.6em"};
    border-radius: ${props => props.borderRadius || "10em"};
    cursor: pointer;
    min-width: ${props => props.minWidth || 'auto'};
    text-align: center;

    background: ${props => {
        switch(props.type) {
            case "primary":
                return props.theme.colors.primary
            case "inverted":
                return props.theme.colors.text
            case "secondary":
                return props.theme.colors.accent
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

    &:hover:not(:disabled) {
        background: ${props => {
            switch(props.type) {
                case "primary":
                    return props.theme.colors.primaryHover
                case "inverted":
                    return "white"
                case "secondary":
                    return props.theme.colors.details
                default:
                    return props.theme.colors.accent
            }
        }};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 60%;
    }
`

const StyledFlexButton = styled(Button)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    svg { margin-left: 5px; };
`

const StyledIconButton = styled(Button).attrs(props => ({
    padding: props.small ? "0.5em" : "0.9em",
    borderRadius: "1.2em",
}))`
    line-height: 1;
`

export const IconButton = ({ icon, iconType, ...rest }) => (
    <StyledIconButton {...rest}>
        <Icon name={icon} type={iconType}/>
    </StyledIconButton>
)

export const FlexButton= ({ children, icon, iconType, small, ...rest }) => {
    return (
        <StyledFlexButton {...rest} small={small}>
            {children}
            <Icon name={icon} size={small ? 12 : 20} type={iconType}/>
        </StyledFlexButton>
    )
}

export const Tab = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
    padding: 1.1em 2.6em;
    border-radius: 10em;
    min-width: ${props => props.minWidth || 'auto'};
    text-align: center;
    background-color: ${props => props.theme.colors.elements};
    color: ${props => props.theme.colors.text};
`