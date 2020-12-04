import { request } from "graphql-request"
import { useRouter } from "next/router"
import CodeBlock from "../../components/CodeBlock"
import { Label } from "../../components/elements/BaseElements"
import { H2 } from '../../components/Typography'
import { Flex } from "../../components/elements/MainElements"
import { GET_ALL_SNIPPETS_ID_QUERY, GET_SINGLE_SNIPPET_QUERY } from "../../graphql/queries"

const endpoint = process.env.NEXT_PUBLIC_HASURA_URL

const SnippetPage = ({ snippet }) => {
    const router = useRouter()

    if(router.isFallback) {
        return <div className="loading">Loading...</div>
    }

    return (
        <>  
            <H2>{snippet.title}</H2>
            <Flex h="space-between" v="center">
                <span>{snippet.user.username} &middot; {snippet.createdAt.slice(0, 10)}</span>
                <Flex v="center">
                    <span>54</span>
                    <span className="material-icons">star</span>
                </Flex>
            </Flex>
            <CodeBlock codeString={snippet.code + "\n"} language={snippet.programmingLang}/>    
            <Label>
                Description
            </Label>
            <pre>
                {snippet.description}
            </pre>
        </>
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
