import styled, { css } from "styled-components"

export const H1 = styled.h1`
    font-size: 3.3rem;
    letter-spacing: -2px;
    font-weight: 400;
    color: white;
    margin-bottom: 1.5rem;
`

export const H2 = styled.h1`
    font-size: 2.5rem;
    letter-spacing: -2px;
    font-weight: 400;
    color: white;
    margin-bottom: 1.5rem;
`

const baseStyles = css`
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 1.4em 2.6em;
`

export const Input = styled.input`
    ${baseStyles}
    padding: 1.1em 1.4em 1.1em 20px;
    border-radius: 10em;
    background-color: ${props => props.theme.colors.elements};
    color: ${props => props.theme.colors.text};

    ::placeholder {
        color: ${props => props.theme.colors.details};
    }
`

export const InputField = styled.div`
    display: inline-block;
    border-radius: 10em;
    background-color: ${props => props.theme.colors.elements};
    font-size: 0.8rem;
    padding: 1.1em 1.4em;
    position: relative;

    input {
        border: none;
        outline: none;
        font-family: inherit;
        background-color: transparent;
        font-size: 0.8rem;
        font-weight: 500;
        padding-left: 2rem;
        color: ${props => props.theme.colors.text};

        ::placeholder { color: ${props => props.theme.colors.details}; }
    }

    span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: ${props => props.theme.colors.details};
    }
`

export const NavItem = styled.li`
    font-size: 0.9rem;
    font-weight: 600;
    width: 100%;
    border-radius: 10em;
    margin-bottom: 0.6rem;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: ${props => props.theme.colors.text};
        text-decoration: none;
        line-height: 1;
    }
    .icon {
        color: ${props => props.theme.colors.details};
        font-size: 1.2rem;
    }
    .menu-text {   //span
        margin-left: 10px;
    }
    ${props => props.active && css`
        background: ${props => props.theme.colors.primary};
        .icon { color: ${props => props.theme.colors.text}; }
    `}

    &:hover { background-color: ${props => props.theme.colors.elements}}
`

export const TextArea = styled.textarea`
    ${baseStyles}
    padding: 20px;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.colors.elements};
    color: ${props => props.theme.colors.text};
    resize: none;
    display: block;
    width: 100%;

    ::placeholder {
        color: ${props => props.theme.colors.details};
    }

    &::-webkit-scrollbar {
        height: 10px;
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(124, 124, 124, 0.1);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(124, 124, 124, 0.3);
    }
    ::-webkit-scrollbar-corner { background: transparent }
`
 
export const Skeleton = styled.div`
    border-radius: ${props => props.theme.borderRadius};
    display: block;
    height: ${props => props.h || "100%"};
    width: ${props => props.w || "100%"};
    background: linear-gradient(-90deg,
        ${props => props.theme.colors.elements} 0%,
        ${props => props.theme.colors.details} 50%,
        ${props => props.theme.colors.elements} 100% );
    background-size: 400% 400%;
    animation: pulse 1.2s ease-in-out infinite;
    margin-bottom: 5px;
    @keyframes pulse {
        0% {
            background-position: 0% 0%;
        }
        100% {
            background-position: -135% 0%;
        }
    }
`

export const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: 5px;
    margin-bottom: 5px;
    display: block;
`

