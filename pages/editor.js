import { useState } from "react"
import { useMutation } from '@apollo/client'
import { CREATE_SNIPPET_MUTATION } from '../graphql/mutations'
import CodeEditor from "../components/CodeEditor"
import { Container, Header, Dropdown, TextArea, SubmitButton } from '../components/elements/EditorElements'

const defaultCode = `public void yourAwesomeFunction() {
    // copy or write your code!
}`;

function EditorPage() {
    const [snippet, setSnippet] = useState({title: "", code: defaultCode, description: "", language: "java"})
    const [addSnippet, {error}] = useMutation(CREATE_SNIPPET_MUTATION);

    const onCodeChange = (codeString) => {
        setSnippet({...snippet, code: codeString});
    };

    const onChange = (e) => {
        setSnippet({...snippet, [e.target.name]: e.target.value})
    }

    const publishSnippet = () => {
        addSnippet({variables: {code: snippet.code, title: snippet.title, description: snippet.description, programmingLang: "HTML", userId: "26457dd0-1a1e-4102-8fd1-8315dd143a8c" }});
    }

    if(error) return <div>error</div>

    return (
        <Container>
            <Header>
                <input placeholder="Title..." value={snippet.title} onChange={onChange} name="title"/>
                <Dropdown>
                    <select value={snippet.language} onChange={onChange} name="language">
                        <option value="java">Java</option>
                        <option value="javascript">Javascript</option>
                        <option value="css">Css</option>
                        <option value="html">HTML</option>
                        <option value="sql">SQL</option>
                        <option value="c">C</option>
                    </select>
                </Dropdown>
            </Header>
            <TextArea
                rows={3}
                placeholder="Explain what this code does..."
                name="description"
                onChange={onChange}
                value={snippet.description}
            />
            <CodeEditor onChangeHandler={onCodeChange} valueHandler={snippet.code} language={snippet.language}/>
            <SubmitButton
                onClick={publishSnippet}
                disabled={!snippet.title || !snippet.code || !snippet.description}
            >PUBLISH</SubmitButton>
        </Container>
    );
}
export default EditorPage;