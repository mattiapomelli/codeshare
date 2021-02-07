import Flex from './Flex'
import Icon from './Icon'
import Link from 'next/link'
import styled from 'styled-components'

const FooterContainer = styled.footer`
	font-size: 0.8rem;
	padding: 2rem 0;
	width: ${props => (props.expanded ? '100%' : '90%')};
	max-width: ${props => (props.expanded ? 'auto' : '1200px')};
	border-top: 1px solid ${props => props.theme.colors.details};
	margin: 3rem auto 0 auto;
	ul:first-of-type {
		flex: 1;
	}
`

const LinksList = styled(Flex)`
	list-style-type: none;

	li:not(:last-of-type) {
		margin-right: 1.2rem;
	}
	a {
		cursor: pointer;
		color: inherit;
		text-decoration: none;
	}
`

export default function Footer({ expanded }) {
	return (
		<FooterContainer expanded={expanded}>
			<Flex h="space-between" v="center" flexWrap="wrap">
				<LinksList as="ul" flexWrap="wrap">
					<li>&copy; 2020, Codeshare</li>
					<Link href="/privacy-policy">
						<li>
							<a>Privacy</a>
						</li>
					</Link>
					<Link href="/terms">
						<li>
							<a>Terms</a>
						</li>
					</Link>
					<li>
						<a href="mailto:hello@codeshare.tech">Contact</a>
					</li>
				</LinksList>
				<LinksList as="ul" flexWrap="wrap" h="flex-end">
					<li>
						<Icon name="instagram" type="primary" size={18} />
					</li>
					<li>
						<Icon name="twitch" type="primary" size={18} />
					</li>
				</LinksList>
			</Flex>
		</FooterContainer>
	)
}
