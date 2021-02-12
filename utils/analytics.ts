import ReactGA from 'react-ga'

export const initGA = () => {
	console.log('init GA')
	ReactGA.initialize('UA-186085839-1')
}

export const logPageView = () => {
	console.log('page view:', window.location.pathname)
	ReactGA.set({ page: window.location.pathname })
	ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
	if (category && action) {
		ReactGA.event({ category, action })
	}
}

export const logException = (description = '', fatal = false) => {
	if (description) {
		ReactGA.exception({ description, fatal })
	}
}
