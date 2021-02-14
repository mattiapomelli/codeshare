import type { AppProps } from 'next/app'
import { useEffect, useRef } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Provider } from 'next-auth/client'
import DefaultLayout from '@/layouts/DefaultLayout'
import theme from '../themes/theme'
import { useRouter } from 'next/router'
import { initGA, logPageView } from '@/utils/analytics'
import { NotificationProvider } from '@/hooks/use-notification'

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
		font-family: ${(props) => props.theme.fonts.main};
		background-color: ${(props) => props.theme.colors.background};
		color: ${(props) => props.theme.colors.text};
	}

	ul { list-style-type: none; }
	::selection { background-color: rgba(113, 198, 238, 0.25);}

	/* @media ${(props) =>
		props.theme.breakpoints.tablet} { :root{font-size: 16px;} }
	@media ${(props) =>
		props.theme.breakpoints.desktop} { :root{font-size: 16px;} } */
`

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

declare global {
	interface Window {
		GA_INITIALIZED: boolean
	}
}

export default function App({ Component, pageProps }: AppProps) {
	const AppComponent = Component as typeof Component & {
		layout?: typeof DefaultLayout
	}

	const router = useRouter()
	const prevPath = useRef(null)

	useEffect(() => {
		if (!window.GA_INITIALIZED) {
			initGA()
			window.GA_INITIALIZED = true
		}

		if (IS_PRODUCTION) logPageView()

		const handleRouteChangeStart = () => {
			prevPath.current = window.location.pathname
		}

		const handleRouteChangeComplete = () => {
			if (window.location.pathname !== prevPath.current && IS_PRODUCTION) {
				logPageView()
			}
		}

		router.events.on('routeChangeStart', handleRouteChangeStart)
		router.events.on('routeChangeComplete', handleRouteChangeComplete)
		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart)
			router.events.off('routeChangeComplete', handleRouteChangeComplete)
		}
	}, [router.events])

	const Layout = AppComponent.layout || DefaultLayout

	return (
		<Provider session={pageProps.session}>
			<ThemeProvider theme={theme}>
				<NotificationProvider>
					<GlobalStyle />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</NotificationProvider>
			</ThemeProvider>
		</Provider>
	)
}
