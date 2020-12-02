import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apolloClient'
import { createGlobalStyle, ThemeProvider } from "styled-components"
import SearchProvider from '../contexts/SearchContext'
import PopupProvider from '../contexts/PopupContext'
import { Provider } from 'next-auth/client'
import Layout from "../components/Layout"
import theme from "../themes/theme"
import { useRouter } from "next/router"


const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html, body, #__next {
		min-height: 100vh;
	}
	:root { font-size: 12px; }

	body {
		font-family: ${props => props.theme.fonts.main};
		background-color: ${props => props.theme.colors.background};
		color: ${props => props.theme.colors.text};
	}

	ul { list-style-type: none; }

	@media ${props => props.theme.breakpoints.tablet} { :root{font-size: 14px;} }
	@media ${props => props.theme.breakpoints.tablet} { :root{font-size: 16px;} }

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
	const router = useRouter()
	const paths = ["/", "/login"]

  	return (
		<Provider session={pageProps.session}>
			<ApolloProvider client={apolloClient}>
				<SearchProvider>
					<ThemeProvider theme={theme}>
						<PopupProvider>
							<GlobalStyle />
							{
								paths.includes(router.pathname) ? <Component {...pageProps} /> : (
									<Layout>
									<Component {...pageProps} />
									</Layout>
								)
							}
						</PopupProvider>
					</ThemeProvider>
				</SearchProvider>
			</ApolloProvider>
		</Provider>
  	)
}
