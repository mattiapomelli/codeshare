import styled, { css } from "styled-components"

export const H1 = styled.h1`
    font-size: 2.4rem;
    letter-spacing: -2px;
    font-weight: 600;
    color: black;
`

const baseStyles = css`
    border-radius: ${props => props.theme.borderRadius};
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 1.4em 2.6em;
`

export const Button = styled.button`
    ${baseStyles}
    cursor: pointer;

    background-color: ${props => {
        switch(props.type) {
            case "primary":
                return props.theme.colors.mainBlack
            case "accent":
                return props.theme.colors.purple
            default:
                return props.theme.colors.lightGrey
        }
    }};

    color: ${props => {
        switch(props.type) {
            case "primary":
                return "white"
            case "accent":
                return "white"
            default:
                return props.theme.colors.darkGrey
        }
    }};

    ${props => props.flex && css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        & > :last-child {margin-left: 8px}
    `}  
`

export const Input = styled.input`
    ${baseStyles}
    padding-left: 20px;
    background-color: ${props => props.theme.colors.lightGrey};
    color: ${props => props.theme.colors.darkGrey};

    ::placeholder {
        color: ${props => props.theme.colors.darkGrey};
    }
`

export const InputField = styled.div`
    display: inline-block;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.colors.lightGrey};
    color: ${props => props.theme.colors.darkGrey};
    font-size: 0.8rem;
    padding: 1.4em 1.4em;
    position: relative;

    input {
        border: none;
        outline: none;
        font-family: inherit;
        background-color: transparent;
        font-size: 0.8rem;
        font-weight: 500;
        padding-left: 2rem;
    }

    span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
`

export const DropdownMenu = styled.div`
    position: relative;
    display: inline-block;

    ${Button} {
        padding: 1.4em 2.1em;
        min-width: 8.5em;

        &:hover { filter: brightness(97%); }

        svg { width: 0.8em; height: 0.57em}
    }

    ul {
        list-style-type: none;
        position: absolute;
        top: 110%;
        border-radius: ${props => props.theme.borderRadius};
        background-color: ${props => props.theme.colors.lightGrey};
        padding: 0.5em;
        z-index: 3;

        li {
            font-size: 0.8rem;
            font-weight: 500;
            padding: 1.2em 2.6em;
            cursor: pointer;
            background-color: ${props => props.theme.colors.lightGrey};
            border-radius: ${props => props.theme.borderRadius};
            &:hover { filter: brightness(97%); }
        }
    }
`

export const NavItem = styled.li`
    color: ${props => props.theme.colors.darkGrey};
    font-size: 0.9rem;
    font-weight: 600;
    padding: 1.4em 2em 1.4em 2em;
    border-radius: ${props => props.theme.borderRadius};
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    span {
        margin-right: 10px;
    }

    :nth-child(2) {
        background-color: ${props => props.theme.colors.lightGrey};
    }
`

export const Grid = styled.div`
	width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 25px;
    margin-top: 1rem;
	
	@media ${props => props.theme.breakpoints.tablet} {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	}
`

export const Flex = styled.div`
    display: flex;
    justify-content: ${props => props.h};
    align-items: ${props => props.v};
    flex-direction: ${props => props.dir};
    width: ${props => props.w || "auto"};
    margin: auto;
`

export const NavMenu = styled(Flex)`
    padding-top: 1.5rem;
    width: 90%;
    max-width: 1200px;
`

export const List = styled.ul`
    list-style-type: none;

    ${props => props.horizontal && css`
        & li {
            display: inline-block;
        }
    `}

    & > *:not(:last-child){
        margin-right: ${props => props.horizontal ? props.margin : "0"};
        margin-bottom: ${props => props.vertical ? props.margin : "0"};
    }
`

export const Hero = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 90%;
    max-width: 1200px;
    margin: 1rem auto;

    .hero-left {
        flex: 1;
        text-align: center; 

        h1 {
            font-size: 4rem;
            line-height: 1;
        }
        p { margin: 20px 0;}
        button:first-of-type { margin-right: 10px; }
    }

    .hero-right {
        flex: 2;
        position: relative;
        text-align: right;
        width: 100%;
        /* margin-left: -80px; */
    }

    @media ${props => props.theme.breakpoints.desktop} {
        flex-direction: row;
        & .hero-left { text-align: left; }
    }
`

export const Bubble = styled.span`
    position: absolute;
    width: ${props => props.width};
    height: ${props => props.width};
    top: ${props => props.top};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    right: ${props => props.right};
    border-radius: 50%;
    z-index: -1;
    background-color: ${props => props.theme.colors[props.color]};
`

export const Form = styled(Flex).attrs(props => ({
    as: "form"
}))`
    width: 80%;
    max-width: 260px;
    margin-top: 5rem;

    input { margin-bottom: 1rem; }
    hr {
        margin: 1rem auto;
        border: none;
        background-color: #B8B8B8;
        height: 2px;
        width: 95%;
    }
`    

export const SnippetTitle = styled(Flex)`
    padding: 0 20px;

    .info {
        flex: 1;
        min-width: 0;
        .title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: -7px;
            font-size: 1.1rem;
            letter-spacing: -1.2px;
            font-weight: 600;
        }
        .user {
            font-size: 0.9rem;
            font-size: 300;
        }
    }

    .likes {
        display: inline-flex;
        align-items: center;
        margin-left: 10px;
    }
`

export const Skeleton = styled.div`
    border-radius: ${props => props.theme.borderRadius};
    display: block;
    height: ${props => props.h || "100%"};
    width: ${props => props.w || "100%"};
    background: linear-gradient(-90deg, #eee 0%, #F8F8F8 50%, #eee 100%);
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

export const TextArea = styled.textarea`
    ${baseStyles}
    padding-left: 20px;
    background-color: ${props => props.theme.colors.lightGrey};
    color: ${props => props.theme.colors.darkGrey};
    resize: none;
    display: block;
    width: 100%;
    height: 200px;

    ::placeholder {
        color: ${props => props.theme.colors.darkGrey};
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

export const EditorForm = styled(Flex)`
    width: 800px;

    & div:first-child {
        width: 100%;
        & div:first-child {
            flex: 1;
            margin-right: 10px;
            input { width: 100%;}
        }
    }
    & > button {
        align-self: flex-end;
        margin-top: 10px;
    }
`    

export const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    margin-left: 5px;
    display: block;
`