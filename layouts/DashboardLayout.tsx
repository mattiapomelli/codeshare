import { useState } from 'react'
import Link from 'next/link'
import { Header, Page } from '@/components/Layout'
import Sidebar from '@/components/Sidebar'
import Button from '@/components/Button'
import { IconButton } from '@/components/Icon'
import Footer from '@/components/Layout/Footer'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'

interface Props {
	children: React.ReactNode
}

export const Main = styled.main`
	padding: 0.5rem 0 4rem 0;
	flex: 1;
`

const DashboardLayout = ({ children }: Props) => {
	const [collapsed, setCollapsed] = useState(false)
	const [session] = useSession()

	const clickHandler = () => {
		setCollapsed((collapsed) => !collapsed)
	}

	return (
		<>
			<Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
			<Page collapsed={collapsed}>
				<Header>
					<IconButton onClick={clickHandler} icon="menu" />
					<Link href={session ? '/editor' : '/signup'}>
						<Button variant="primary">Share code</Button>
					</Link>
				</Header>
				<Main>{children}</Main>
				<Footer expanded />
			</Page>
		</>
	)
}

export default DashboardLayout
