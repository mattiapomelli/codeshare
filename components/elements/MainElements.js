import styled, { css } from "styled-components"

export const H1 = styled.h1`
    font-size: 3.3rem;
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

export const Button = styled.button`
    ${baseStyles}
    cursor: pointer;
    border-radius: 10em;

    background: ${props => {
        switch(props.type) {
            case "primary":
                return props.theme.colors.primary
            default:
                return props.theme.colors.elements
        }
    }};

    color: ${props => {
        switch(props.type) {
            case "primary":
                return "white"
            default:
                return props.theme.colors.text
        }
    }};

    ${props => props.flex && css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        & > :last-child {margin-left: 8px}
    `}  
`

export const IconButton = styled.button`
    border: none;
    outline: none;
    background-color: ${props => props.theme.colors.elements};
    color: ${props => props.theme.colors.text};
    border-radius: 1.2em;
    padding: 0.9em;
    cursor: pointer;

    span { font-size: 1.1rem; line-height: 1;}

    &:hover {
        background-color: ${props => props.theme.colors.details};
    }
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

        ::placeholder { color: ${props => props.theme.colors.text}; }
    }

    span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: ${props => props.theme.colors.details};
    }
`

export const DropdownMenu = styled.div`
    position: relative;
    display: inline-block;

    ${Button} {
        padding: 1.1em 1.4em;
        min-width: 9.2em;

        &:hover { background-color: ${props => props.theme.colors.details}; }

        svg {
            width: 0.8em;
            height: 0.57em;
            color: ${props => props.theme.colors.details};
        }
    }

    ul {
        /* box-shadow: 2px 2px 2px 2px #222; */
        list-style-type: none;
        position: absolute;
        top: 110%;
        border-radius: ${props => props.theme.borderRadius};
        background-color: ${props => props.theme.colors.elements};
        border: 1px solid ${props => props.theme.colors.details};
        padding: 0.5em;
        z-index: 3;

        li {
            font-size: 0.7rem;
            font-weight: 500;
            padding: 0.7em 2.6em;
            cursor: pointer;
            background-color: ${props => props.theme.colors.elements};
            border-radius: ${props => props.theme.borderRadius};
            &:hover { background-color: ${props => props.theme.colors.details}; }
        }
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


export const Grid = styled.div`
	width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 25px;
    margin-top: 2rem;
	
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

export const Logo = styled(Flex)`
    color: white;
    cursor: pointer;
    h1 { line-height: 1; margin-left: 5px;}
    span { font-size: 30px}
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
    background-color: ${props => props.theme.colors.primary};
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
            font-size: 1.2rem;
            letter-spacing: -0.7px;
            font-weight: 500;
        }
        .user {
            font-size: 0.8rem;
            font-weight: 300;
            opacity: 0.7;
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

export const TextArea = styled.textarea`
    ${baseStyles}
    padding-left: 20px;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.colors.elements};
    color: ${props => props.theme.colors.text};
    resize: none;
    display: block;
    width: 100%;
    height: 300px;

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
  
export const EditorForm = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 200px auto;
    grid-template-areas:
        "info"
        "editor"
        "description"
        "submit";
    grid-gap: 10px 20px;

    .editor {
        height: 400px;
        grid-area: editor;
        display: flex;
        flex-direction: column;
        & > div { flex: 1; }
    };
    .info {
        grid-area: info;
        display: flex;
        div:first-child{
            flex: 1;
            margin-right: 10px;
            input {
                width: 100%;
            }
        }
    };
    .description {
        grid-area: description;
        display: flex;
        flex-direction: column;
        div { flex: 1; }
        textarea { height: 100% }
    };
    .submit {
        grid-area: submit;
        text-align: right;
    }

    @media ${props => props.theme.breakpoints.desktop} {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "editor info"
            "editor description"
            "submit submit";
    }
`

export const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: 5px;
    margin-bottom: 5px;
    display: block;
`

