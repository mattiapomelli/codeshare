import styled from "styled-components"

export const CodeWrapper = styled.div`
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.colors.elements};
    padding: 40px 0px 0px 20px;
    position: relative;
    overflow: hidden;

    pre {
        /* min-height: 100%; */
        font-size: 0.9rem !important;
        border-bottom: 20px solid transparent !important;    // !important if want for editor    
    }

    code span {
        font-size: 0.9rem !important;
        /* line-height: 1; */
    }

    code > span { padding-right: 20px }

    .dot {
        position: absolute;
        width: 0.8rem;
        height: 0.8rem;
        top: 10px;
        background-color: ${props => props.theme.colors.details};
        border-radius: 50%;
        &:first-child { left: 20px };
        &:nth-child(2) { left: calc(20px + 0.8rem + 0.2rem) };
        &:nth-child(3) { left: calc(20px + 0.8rem*2 + 0.2rem*2)} ;
    }

    .tooltip {
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
    }

    .copy-button {
        position: absolute;
        bottom: 18px;
        right: 16px;
        padding: 0.6em;
        border-radius: 5rem;
        font-size: 1rem;
        color: white;
        cursor: pointer;
        &:hover { 
            background-color: ${props => props.theme.colors.background}
        }
    }

    .copied {
        position: absolute;
        font-size: 0.8rem;
        bottom: 25px;
        right: 20px;
        font-family: monospace;
    }

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

export const ScrollWrapper = styled.div`
    overflow: auto;
    /* height: 260px; */
    height: ${props => props.height || "100%" };
    
    &::-webkit-scrollbar {
        height: 10px;
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(72, 72, 72, 0.3);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(72, 72, 72, 0.4);
    }
    ::-webkit-scrollbar-corner { background: transparent }
`

export const EditorWrapper = styled(CodeWrapper)` 
    /* padding-bottom: 20px; */

    & > div > * {   //editor
        border-right: 10px solid ${props => props.theme.colors.elements};
    }

    textarea {
        border: none;
        background-color: transparent;
        resize: none;
        outline: none;
        caret-color: white;
        overflow-x: scroll;
        font-size: 0.9rem !important;
        /* color: transparent !important; */

        &::selection { background-color: ${props => props.theme.colors.text} !important; }
    }
`       