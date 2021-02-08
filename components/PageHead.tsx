import NextHead from 'next/head'

export default function PageHead({ title }: { title: string }) {
	return (
		<NextHead>
			<title>{title}</title>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
			/>
		</NextHead>
	)
}
