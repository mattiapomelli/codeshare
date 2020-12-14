import { Fragment, useEffect } from "react"
import Editor from "react-simple-code-editor";
import styled from "styled-components";
import CodeHighlight from "./Code/CodeHighlight";
import { CodeLayout } from "./Code/CodeLayout";
import { ScrollWrapper } from './Code/ScrollWrapper'

const StyledEditor = styled(Editor)`
    border-right: 10px solid ${props => props.theme.colors.elements};
    font-family: monospace;
    min-height: 100%;
    textarea {
        border: none;
        background-color: transparent;
        resize: none;
        outline: none;
        caret-color: white;
        font-size: 0.9rem !important;

        /* &::selection { background-color: ${props => props.theme.colors.text} !important; } */
    }
`

const CodeEditor = ({ onChangeHandler, valueHandler, language}) => {

    useEffect(() => {
        function scrollOnNewLine(event) {
            // if enter is pressed in textarea scroll to bottom as much as lineheight is
            const textarea = document.getElementById("editor-textarea")
            if(event.key === "Enter" && document.activeElement == textarea) {
                const scroller = document.getElementById("scroller");
                const fontSize = window.getComputedStyle(textarea).getPropertyValue('font-size');         
                scroller.scrollTop += parseFloat(fontSize.slice(0, -2) * 1.2);
            }
        }
        window.addEventListener('keydown', scrollOnNewLine)

        return () => window.removeEventListener('keydown', scrollOnNewLine)
    }, [])

    const Pre = ({ children}) => (
        <Fragment>
            {children}
        </Fragment>
    )

    const highlight = (codeString) => <CodeHighlight language={language} codeString={codeString} pre={Pre} wrapLongLines/>

    return (
        <CodeLayout language={language.toLowerCase()}>
            <ScrollWrapper id="scroller">
                <StyledEditor
                    value={valueHandler}
                    onValueChange={onChangeHandler}
                    highlight={codeString => highlight(codeString)}
                    tabSize={2}
                    textareaId="editor-textarea"
                />
            </ScrollWrapper>
        </CodeLayout>
    )
}

export default CodeEditor