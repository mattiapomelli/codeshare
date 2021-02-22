// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {
		fonts: {
			main: string
			code: string
		}
		colors: {
			primary: string
			primaryHover: string
			sidebar: string
			background: string
			elements: string
			accent: string
			details: string
			secondaryText: string
			text: string
			code: {
				javascript: string
				java: string
				sql: string
				c: string
				css: string
				html: string
				python: string
				'c++': string
				go: string
				php: string
			}
		}
		breakpoints: {
			tablet: string
			desktop: string
		}
		borderRadius: string
		sidebarWidth: string
		sidebarWidthCollapsed: string
		headerHeight: string
	}
}
