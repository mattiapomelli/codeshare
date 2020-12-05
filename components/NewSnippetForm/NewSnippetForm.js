import { useState } from "react"
import { executeQuery } from '../../graphql/client'
import { CREATE_SNIPPET_MUTATION } from '../../graphql/mutations'
import { useSession } from 'next-auth/client'
import CodeEditor from "../CodeEditor"
import { TextArea } from "../TextArea"
import { Input } from '../Input'
import { Label } from '../Typography'
import { EditorForm, EditorArea, DescriptionArea, InfoArea, SubmitArea } from './FormElements'
import { Button } from '../Button'
import Dropdown from "../Dropdown/Dropdown"

const defaultCode = `public void yourAwesomeFunction() {
    // copy or write your code!
}`;

const languages = ["Javascript", "HTML", "CSS", "C", "Python"]

export default function NewSnippetForm() {
    const [snippet, setSnippet] = useState({title: "", code: defaultCode, description: "", programmingLang: "Javascript"})
    const [session] = useSession()

    const onCodeChange = (codeString) => {
        setSnippet({...snippet, code: codeString});
    };

    const onLanguageChange = (programmingLang) => {
        setSnippet({...snippet, programmingLang });
    };

    const onChange = (e) => {
        setSnippet({...snippet, [e.target.name]: e.target.value})
    }

    const publishSnippet = (e) => {
        e.preventDefault();
        executeQuery(CREATE_SNIPPET_MUTATION, {...snippet, userId: session.user.id}, session.user.jwt)
        .then(res => console.log(res))
        //addSnippet({variables: {...snippet, userId: "26457dd0-1a1e-4102-8fd1-8315dd143a8c" }});
    }

    return (
        <EditorForm dir="column" h="center" v="stretch">        
            <EditorArea>
                <Label>Code</Label>
                <CodeEditor onChangeHandler={onCodeChange} valueHandler={snippet.code} language={snippet.programmingLang}/>
            </EditorArea>
            <InfoArea>
                <div>
                    <Label>Title</Label>
                    <Input placeholder="Title" value={snippet.title} onChange={onChange} name="title"/>
                </div>
                <div>
                    <Label>Language</Label>
                    <Dropdown options={languages} value={snippet.programmingLang} onSelect={onLanguageChange}/>
                </div>
            </InfoArea>
            <DescriptionArea>
                <Label>Description</Label>
                <div>
                    <TextArea
                        placeholder="Describe your snippet"
                        className="description"
                        name="description"
                        onChange={onChange}
                        value={snippet.description}
                    />
                </div>
            </DescriptionArea>
            <SubmitArea>
                <Button
                    type="primary"
                    onClick={publishSnippet}
                    disabled={!snippet.title || !snippet.code || !snippet.description}
                >Publish
                </Button>
            </SubmitArea>
        </EditorForm>
    )
}
