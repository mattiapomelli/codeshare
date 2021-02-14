import Flex from '../components/Flex'
import styled from 'styled-components'
import { H2 } from '../components/Typography'
import Logo from '../components/Logo'
import PageHead from '../components/PageHead'

const Container = styled(Flex)`
	max-width: 840px;
	margin-bottom: 3rem;
	font-weight: 300;
	p {
		margin-bottom: 1rem;
	}
	a {
		color: #5698e4;
	}
`

export default function PrivacyPolicy() {
	return (
		<>
			<PageHead title="Privay Policy – Codeshare" />
			<Container v="center" dir="column">
				<Logo noText />
				<H2 style={{ margin: '1rem 0 3rem 0' }}>Privacy-policy</H2>
				<div>
					<p>
						Your privacy is important to us. It is codeshare's policy to respect
						your privacy regarding any information we may collect from you
						across our website,{' '}
						<a href="https://codeshare.tech">https://codeshare.tech</a>, and
						other sites we own and operate.
					</p>
					<p>
						We only ask for personal information when we truly need it to
						provide a service to you. We collect it by fair and lawful means,
						with your knowledge and consent. We also let you know why we’re
						collecting it and how it will be used.
					</p>
					<p>
						We only retain collected information for as long as necessary to
						provide you with your requested service. What data we store, we’ll
						protect within commercially acceptable means to prevent loss and
						theft, as well as unauthorized access, disclosure, copying, use or
						modification.
					</p>
					<p>
						We don’t share any personally identifying information publicly or
						with third-parties, except when required to by law.
					</p>
					<p>
						Our website may link to external sites that are not operated by us.
						Please be aware that we have no control over the content and
						practices of these sites, and cannot accept responsibility or
						liability for their respective privacy policies.
					</p>
					<p>
						You are free to refuse our request for your personal information,
						with the understanding that we may be unable to provide you with
						some of your desired services.
					</p>
					<p>
						Your continued use of our website will be regarded as acceptance of
						our practices around privacy and personal information. If you have
						any questions about how we handle user data and personal
						information, feel free to contact us.
					</p>
					<p>This policy is effective as of 24 December 2020.</p>
				</div>
			</Container>
		</>
	)
}
