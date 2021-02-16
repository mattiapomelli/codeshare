import { Navbar, Footer } from '@/components/Layout'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

const Main = styled.main`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 90%;
	max-width: 1200px;
	margin: 3rem auto 8rem auto;
`

const DefaultLayout: FunctionComponent = ({ children }) => {
	return (
		<>
			<Navbar />
			<Main>{children}</Main>
			<Footer />
		</>
	)
}

export default DefaultLayout
