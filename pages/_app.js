import { useEffect } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import SearchProvider from '../contexts/SearchContext'
import { Provider } from 'next-auth/client'
import Layout from '../components/Layout/Layout'
import theme from '../themes/theme'
import { useRouter } from 'next/router'
import { initGA } from '../utils/analytics'
// import dynamic from 'next/dynamic'

// const Layout = dynamic(() => import('../components/Layout/Layout'))

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html, body, #__next {
		min-height: 100vh;
	}
	:root { font-size: 16px; }

	body {
		font-family: ${props => props.theme.fonts.main};
		background-color: ${props => props.theme.colors.background};
		color: ${props => props.theme.colors.text};
	}

	ul { list-style-type: none; }
	::selection { background-color: rgba(113, 198, 238, 0.25);}

	/* @media ${props => props.theme.breakpoints.tablet} { :root{font-size: 16px;} }
	@media ${props =>
		props.theme.breakpoints.desktop} { :root{font-size: 16px;} } */
`

export default function App({ Component, pageProps }) {
	const router = useRouter()
	const paths = ['/', '/login', '/signup', '/resetpassword']

	useEffect(() => {
		if (!window.GA_INITIALIZED) {
			initGA()
			window.GA_INITIALIZED = true
		}
	}, [])

	return (
		<Provider session={pageProps.session}>
			<SearchProvider>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					{paths.includes(router.pathname) ? (
						<>
							<Component {...pageProps} />
						</>
					) : (
						<Layout>
							<Component {...pageProps} />
						</Layout>
					)}
				</ThemeProvider>
			</SearchProvider>
		</Provider>
	)
}
