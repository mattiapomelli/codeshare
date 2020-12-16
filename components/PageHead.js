import Head from 'next/head'

export default function PageHead({ title }) {
    return (
        <Head>
            <title>{ title }</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"/>
        </Head>
    )
} 