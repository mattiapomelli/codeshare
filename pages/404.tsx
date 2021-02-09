import { useEffect } from 'react'
import Flex from '../components/Flex'
import styled from 'styled-components'
import { H2 } from '../components/Typography'
import Logo from '../components/Logo'
import { logPageView } from '../utils/analytics'

const FlexContainer = styled(Flex)`
	height: 70vh;
	h2 {
		margin-top: 3rem;
	}
`

export default function Custom404() {
	useEffect(() => {
		logPageView()
	}, [])

	return (
		<FlexContainer v="center" h="center" dir="column">
			<Logo noText />
			<H2>404</H2>
			<h3>Page Not Found</h3>
		</FlexContainer>
	)
}
