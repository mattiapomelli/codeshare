import { useState } from "react"
import { executeQuery } from '../../graphql/client'
import { CREATE_SNIPPET_MUTATION } from '../../graphql/mutations'
import { useSession } from 'next-auth/client'
import CodeEditor from "../CodeEditor"
import { TextArea } from "../TextArea"
import { Input } from '../Input'
import { Label } from '../Typography'
import { EditorForm, EditorArea, DescriptionArea, InfoArea, SubmitArea, InfoIcon } from './FormElements'
import TextLimiter from './TextLimiter'
import { Button } from '../Button'
import Dropdown from "../Dropdown/Dropdown"
import InfoModal from "./InfoModal"
import Popups from '../Popup/Popup'

const defaultCode = `function yourAwesomeFunction() {
    // copy or write your code!
}`;

const limits = { title: 80, code: 2000, description: 1000 }

export default function NewSnippetForm({ langs }) {
    const [snippet, setSnippet] = useState({title: "", code: defaultCode, description: "", programmingLang: "JavaScript"})
    const [session] = useSession()
    const [showModal, setShowModal] = useState(false)
    const [messages, setMessages] = useState([])

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
        executeQuery(CREATE_SNIPPET_MUTATION, {...snippet }, session.user.jwt)
        .then(res => {
            setMessages(messages => [...messages, { type: 'success', text: "Snippet published!"}])
            setSnippet(prevSnippet => ({...prevSnippet, title: '', description: '', code: defaultCode}))
        }).catch(err => {
            setMessages(messages => [...messages, { type: 'error', text: "Something went wrong"}])
        })
    }

    return (
        <>
        <EditorForm dir="column" h="center" v="stretch">        
            <EditorArea>
                <Label>Code</Label>
                <CodeEditor onChangeHandler={onCodeChange} valueHandler={snippet.code} language={snippet.programmingLang}/>
                <TextLimiter value={snippet.code} limit={limits.code}/>
            </EditorArea>
            <InfoArea>
                <div>
                    <Label>Title</Label>
                    <Input placeholder="Title" value={snippet.title} onChange={onChange} name="title" spellCheck="false"/>
                    <TextLimiter value={snippet.title} limit={limits.title}/>
                </div>
                <div>
                    <Label>Language</Label>
                    <Dropdown options={langs} value={snippet.programmingLang} onSelect={onLanguageChange} as="span" right minWidth="7rem"/>
                </div>
            </InfoArea>
            <DescriptionArea>
                <Label>Description
                    <InfoIcon name="info" size={16} type="primary" onClick={() => setShowModal(true)}/>
                </Label>
                <div>
                    <TextArea
                        placeholder="Describe your snippet"
                        className="description"
                        name="description"
                        onChange={onChange}
                        value={snippet.description}
                        spellCheck="false"
                    />
                </div>
                <TextLimiter value={snippet.description} limit={limits.description}/>
            </DescriptionArea>
            
            <SubmitArea>
                <Button
                    type="primary"
                    onClick={publishSnippet}
                    disabled={
                        !snippet.title ||
                        !snippet.code ||
                        !snippet.description ||
                        snippet.title.length > limits.title ||
                        snippet.code.length > limits.code ||
                        snippet.description.length > limits.description
                    }
                >Publish
                </Button>
            </SubmitArea>
        </EditorForm>
        { showModal && <InfoModal close={() => setShowModal(false)}/> }
        <Popups popups={messages} setPopups={setMessages}/>
        </>
    )
}
