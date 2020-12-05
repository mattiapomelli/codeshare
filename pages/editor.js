import { H1 } from '../components/Typography'
import NewSnippetForm from '../components/NewSnippetForm/NewSnippetForm'
import withAuth from '../hocs/withAuth'

function EditorPage() {

    return (
        <>
            <H1>Editor</H1>
            <NewSnippetForm/>
        </> 
    );
}

export default withAuth(EditorPage);