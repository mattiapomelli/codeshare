import { Fragment } from "react"
import Editor from "react-simple-code-editor";
import CodeBlock from "./CodeBlock";
import { EditorWrapper } from "./elements/EditorElements"

const editorStyles = {
    fontFamily: '"Dank Mono", "Fira Code", monospace',
};

const CodeEditor = ({ onChangeHandler, valueHandler, language}) => {

    const CodeWrapper = ({ children}) => (
        <Fragment>
            {children}
        </Fragment>
    )

    const highlight = (codeString) => <CodeBlock language={language} codeString={codeString} pre={CodeWrapper}/>

    return (
        <EditorWrapper>
            <Editor
                value={valueHandler}
                onValueChange={onChangeHandler}
                highlight={codeString => highlight(codeString)}
                tabSize={2}
                style={editorStyles}
            />
        </EditorWrapper>
    )
}

export default CodeEditor