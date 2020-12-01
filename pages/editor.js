import { useState } from "react"
import { useMutation } from '@apollo/client'
import { CREATE_SNIPPET_MUTATION } from '../graphql/mutations'
import CodeEditor from "../components/CodeEditor"
import { EditorForm, TextArea, Flex, Input, Label, Button } from '../components/elements/MainElements'
import Dropdown from "../components/Dropdown"

const defaultCode = `public void yourAwesomeFunction() {
    // copy or write your code!
}`;

const languages = ["Javascript", "HTML", "CSS", "C", "Python"]

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
        <EditorForm dir="column" h="center" v="stretch" as="form">        
            <Flex>
                <div>
                    <Label>Title</Label>
                    <Input placeholder="title" value={snippet.title} onChange={onChange} name="title"/>
                </div>
                <div>
                    <Label>Language</Label>
                    <Dropdown options={languages} value={snippet.language} onSelect={onChange} name="language"/>
                </div>
            </Flex>
            <div>
                <Label>Code</Label>
                <CodeEditor onChangeHandler={onCodeChange} valueHandler={snippet.code} language={snippet.language}/>
            </div>
            <div>
                <Label>Description</Label>
                <TextArea
                    placeholder="Describe your snippet"
                    className="description"
                    name="description"
                    onChange={onChange}
                    value={snippet.description}
                />
            </div>
            <Button
                type="accent"
                onClick={publishSnippet}
                disabled={!snippet.title || !snippet.code || !snippet.description}
            >
            Publish</Button>
        </EditorForm>
    );
}
export default EditorPage;