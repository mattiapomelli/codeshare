import { GetStaticProps } from 'next'
import { H1 } from '@/components/Typography'
import SnippetEditor from '@/components/SnippetEditor'
import withAuth from '@/hocs/withAuth'
import graphQLClientAdmin from '@/graphql/client'
import { GET_PROGRAMMING_LANGS_QUERY } from '@/graphql/queries'
import PageHead from '@/components/PageHead'
import DashboardLayout from '@/layouts/DashboardLayout'

interface Props {
	langs: string[]
}

function EditorPage({ langs }: Props) {
	return (
		<>
			<PageHead title="Editor – Codeshare" />
			<H1>Editor</H1>
			<SnippetEditor langs={langs} />
		</>
	)
}

EditorPage.layout = DashboardLayout

export default withAuth(EditorPage)

export const getStaticProps: GetStaticProps = async () => {
	const data = await graphQLClientAdmin.request(GET_PROGRAMMING_LANGS_QUERY)

	const langs = []
	data.langs.forEach((lang) => {
		langs.push(lang.name)
	})

	return {
		props: { langs },
	}
}
