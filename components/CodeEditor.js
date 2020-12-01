import { Fragment, useEffect } from "react"
import Editor from "react-simple-code-editor";
import CodeHighlight from "./CodeHighlight";
import { EditorWrapper, ScrollWrapper } from "./elements/CodeElements"

const editorStyles = {
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    minHeight: '100%',
    // fontSize: "1.1rem"
};

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

    const CodeWrapper = ({ children}) => (
        <Fragment>
            {children}
        </Fragment>
    )

    const highlight = (codeString) => <CodeHighlight language={language} codeString={codeString} pre={CodeWrapper} wrapLongLines/>

    return (
        <EditorWrapper>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="tooltip">{language}</span>
            <ScrollWrapper id="scroller">
                <Editor
                    value={valueHandler}
                    onValueChange={onChangeHandler}
                    highlight={codeString => highlight(codeString)}
                    tabSize={2}
                    style={editorStyles}
                    textareaId="editor-textarea"
                />
            </ScrollWrapper>
        </EditorWrapper>
    )
}

export default CodeEditor