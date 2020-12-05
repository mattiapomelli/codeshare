import styled from "styled-components"

export const CodeWrapper = styled.div`
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.colors.elements};
    padding: 40px 0px 0px 20px;
    position: relative;
    overflow: hidden;

    pre {
        font-size: 0.9rem !important;
        border-bottom: 20px solid transparent !important;    // !important if want for editor    
    }

    code span {
        font-size: 0.9rem !important;
    }

    code > span { padding-right: 20px }

    &::after {  /* Square to hide corner of scrollbars */
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        content: "";
        background-color: ${props => props.theme.colors.elements};
    } 
`

const Dot = styled.span`
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    top: 10px;
    background-color: ${props => props.theme.colors.details};
    border-radius: 50%;
    &:first-child { left: 20px };
    &:nth-child(2) { left: calc(20px + 0.8rem + 0.2rem) };
    &:nth-child(3) { left: calc(20px + 0.8rem*2 + 0.2rem*2)};
`

const Tooltip = styled.span`
    border-radius: 0 0 0.35rem 0.35rem;
    color: black;
    background-color: ${props => props.theme.colors.code[props.language]};
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
    position: absolute;
    right: 20px;
    text-transform: uppercase;
    top: 0px;
    font-family: monospace;
`

export const CodeLayout = ({ children, language }) => {
    return (
        <CodeWrapper>
            <Dot/>
            <Dot/>
            <Dot/>
            <Tooltip language={language}>{language}</Tooltip>
            { children }
        </CodeWrapper>
    )
}