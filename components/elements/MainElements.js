import styled, { css } from "styled-components"

export const SnippetsGrid = styled.div`
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
    margin: 4rem auto 0 auto;

    h1 {
        font-size: 3rem;
        font-weight: 400;
        margin-bottom: 2rem;
        text-align: center;
    }
    p {
        font-size: 1rem;
        font-weight: 300;
        color: ${props => props.theme.colors.text};
        width: 50%;
        text-align: center;
        margin-bottom: 2rem;
    }
    button:first-of-type { margin-right: 10px; }
    button { margin-bottom: 2rem; }
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

export const Flex = styled.div`
    display: flex;
    justify-content: ${props => props.h};
    align-items: ${props => props.v};
    flex-direction: ${props => props.dir};
    width: ${props => props.w || "auto"};
    margin: ${props => props.auto ? "auto" : 0};
`

export const Logo = styled(Flex)`
    color: white;
    cursor: pointer;
    h1 { line-height: 1; margin-left: 5px; font-size: 1.5rem}
    span { font-size: 30px}
`

export const SnippetTitle = styled(Flex)`
    padding: 0 20px;

    .info {
        flex: 1;
        min-width: 0;
        .title {
            color: ${props => props.theme.colors.text};
            text-decoration: none;
            display: block;
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

export const EditorForm = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 300px auto;
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
        div {
            border-radius: ${props => props.theme.borderRadius};
            overflow: hidden;
            position: relative;
            flex: 1;
            &::after {  /* Square to hide corner of scrollbars */
                position: absolute;
                bottom: 0;
                right: 0;
                width: 20px;
                height: 20px;
                content: "";
                background-color: ${props => props.theme.colors.elements};;
            }
            &::before {  /* Square to hide corner of scrollbars */
                position: absolute;
                top: 0;
                right: 0;
                width: 20px;
                height: 20px;
                content: "";
                background-color: ${props => props.theme.colors.elements};;
            } 
        }
        textarea { height: 100% }
    };
    .submit {
        grid-area: submit;
        text-align: right;
    }

    @media only screen and (min-width: 1200px){
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "editor info"
            "editor description"
            "submit submit";
    }
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 260px;
    margin: 6rem auto 0 auto;

    h3 {
        margin-bottom: 2rem;
    }

    .input-field {
        width: 100%; margin-bottom: 1rem;
        padding: 1.4em 2em
    }

    button {
        width: 100%;
    }

    hr {
        margin: 1rem 0;
        width: 90%;
    }

    p {
        margin-top: 2rem;
        font-size: 0.8rem;
        a {
            color: #0880B9;
            text-decoration: none;
            &:hover { text-decoration: underline; }
        }
    }
`

export const NavMenu = styled(Flex)`
    padding-top: 1.5rem;
    width: 90%;
    max-width: 1200px;
    a {
        cursor: pointer;
    }
    nav {
        animation: fadeIn 1s;
    }
    @keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }
`