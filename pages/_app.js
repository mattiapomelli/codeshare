import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apolloClient'
import { createGlobalStyle } from "styled-components"
import SearchProvider from '../contexts/SearchContext'
import Navbar from "../components/Navbar"
import { Provider } from 'next-auth/client'

const GlobalStyle = createGlobalStyle`
	html,
	body {
		padding: 0;
		margin: 0;
		font-family: 'Raleway', sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	#__next {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		min-height: 100vh;
		background-color: #fff;
		width: 90%;
		max-width: 1000px;
		margin: auto;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.javascript {
		background-color: #f7de1e70 !important;
	}
	.css {
		background-color: #5fa9d470 !important;
	}
	.html {
		background-color: #d45f5f70 !important;
	}
	.java {
		background-color: #c2452f70 !important;
	}
	.c {
		background-color: #5968B870 !important;
	}
	.sql {
		background-color: #31648C70 !important;
	}
`

export default function App({ Component, pageProps }) {
  	const apolloClient = useApollo(pageProps.initialApolloState)

  	return (
		<Provider session={pageProps.session}>
			<ApolloProvider client={apolloClient}>
				<SearchProvider>
					<GlobalStyle />
					<Navbar />
					<Component {...pageProps} />
				</SearchProvider>
			</ApolloProvider>
		</Provider>
  	)
}
