import { Navbar, Footer } from '../components/Layout'
import styled from 'styled-components'

interface Props {
	children: React.ReactNode
}

const Main = styled.main`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 90%;
	max-width: 1200px;
	margin: 3rem auto 8rem auto;
`

const DefaultLayout = ({ children }: Props) => {
	return (
		<>
			<Navbar />
			<Main>{children}</Main>
			<Footer />
		</>
	)
}

export default DefaultLayout
