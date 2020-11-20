import { request } from "graphql-request"
import { useRouter } from "next/router"
import SnippetCard from "../../components/SnippetCard" 
import { GET_ALL_SNIPPETS_ID_QUERY, GET_SINGLE_SNIPPET_QUERY } from "../../graphql/queries"

const endpoint = process.env.NEXT_PUBLIC_HASURA_URL

const SnippetPage = ({ snippet }) => {
    const router = useRouter()

    if(router.isFallback) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div>
            <SnippetCard {...snippet} preview={false}/>
        </div>
    )
}

export async function getStaticPaths() {
    const data = await request(endpoint, GET_ALL_SNIPPETS_ID_QUERY)

    const paths = []
    data.snippets.forEach(snippet => {
        paths.push(
            { params: {id: snippet.id} }
        )
    });
  
    return { paths, fallback: true}
}

export async function getStaticProps({ params }) {
    const data = await request(endpoint, GET_SINGLE_SNIPPET_QUERY, { id: params.id })
  
    return {
        props: { snippet: data.snippet }
    }
}

export default SnippetPage
