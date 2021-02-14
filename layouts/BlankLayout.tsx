import Logo from '../components/Logo'

interface Props {
	children: React.ReactNode
}

const BlankLayout = ({ children }: Props) => {
	return (
		<>
			<Logo vertical style={{ paddingTop: '3rem' }} />
			{children}
		</>
	)
}

export default BlankLayout
