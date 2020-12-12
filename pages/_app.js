import { createGlobalStyle, ThemeProvider } from "styled-components"
import SearchProvider from '../contexts/SearchContext'
import { Provider } from 'next-auth/client'
import Layout from "../components/Layout/Layout"
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
	::selection { background-color: rgba(185,235,255,0.20);}

	@media ${props => props.theme.breakpoints.tablet} { :root{font-size: 14px;} }
	@media ${props => props.theme.breakpoints.tablet} { :root{font-size: 16px;} }
`

export default function App({ Component, pageProps }) {
	const router = useRouter()
	const paths = ["/", "/login", "/signup"]

  	return (
		<Provider session={pageProps.session}>
			<SearchProvider>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					{
						paths.includes(router.pathname) ? <Component {...pageProps} /> : (
							<Layout>
							<Component {...pageProps} />
							</Layout>
						)
					}
				</ThemeProvider>
			</SearchProvider>
		</Provider>
  	)
}
