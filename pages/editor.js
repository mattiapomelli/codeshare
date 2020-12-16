import { H1 } from '../components/Typography'
import NewSnippetForm from '../components/NewSnippetForm/NewSnippetForm'
import withAuth from '../hocs/withAuth'
import graphQLClientAdmin from '../graphql/client'
import { GET_PROGRAMMING_LANGS_QUERY } from '../graphql/queries'
import Head from 'next/head'

function EditorPage({ langs }) {

    return (
        <>
			<Head>
                <title>Editor – Codeshare</title>
            </Head>
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