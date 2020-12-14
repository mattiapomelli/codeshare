import styled from "styled-components"
import { Icon } from "./Icon/Icon"

export const Input = styled.input`
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 1.1em 1.4em 1.1em 20px;
    border-radius: 10em;
    background-color: ${props => props.theme.colors.elements};
    color: ${props => props.theme.colors.text};
    min-width: ${props => props.minWidth || "auto"};

    ::placeholder {
        color: ${props => props.theme.colors.secondaryText};
    }
`

const InputWrapper = styled.div`
    display: inline-block;
    position: relative;

    svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 1rem;
    }

    ${Input} { padding-left: 2.8rem; width: 100% }
`

export const IconInput = ({ icon, className, iconSize, ...rest }) => {
    return (
        <InputWrapper {...rest} className={className}>
            <Icon name={icon} size={iconSize}/>
            <Input {...rest}/>   
        </InputWrapper>
    )
}