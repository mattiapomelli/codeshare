import { useEffect } from 'react'
import { H1 } from '../components/Typography'
import NewSnippetForm from '../components/NewSnippetForm/NewSnippetForm'
import withAuth from '../hocs/withAuth'
import graphQLClientAdmin from '../graphql/client'
import { GET_PROGRAMMING_LANGS_QUERY } from '../graphql/queries'
import PageHead from '../components/PageHead'
import { useRouter } from 'next/router'
import { logPageView } from '../utils/analytics'

function EditorPage({ langs }) {

    useEffect(()=>{
        logPageView()
    },[])
	
    return (
        <>
			<PageHead title="Editor – Codeshare"/>
            <H1>Editor</H1>
            <NewSnippetForm langs={langs}/>
        </> 
    );
}

export default withAuth(EditorPage);

export async function getStaticProps() {
	const data = await graphQLClientAdmin.request(GET_PROGRAMMING_LANGS_QUERY)
	
	const langs = []
	data.langs.forEach(lang => {
		langs.push(lang.name)
	})

	return {
		props: { langs }
	}
}