import Flex from './Flex'
import { Icon } from './Icon/Icon'
import Link from 'next/link'
import styled from 'styled-components'

const FooterContainer = styled.footer`
    font-size: 0.8rem;
    padding: 2rem 0;
    width: ${props => props.expanded ? "100%" : "90%"};
    max-width: ${props => props.expanded ? "auto" : "1200px"};
    border-top: 1px solid ${props => props.theme.colors.details};
    margin: 3rem auto 0 auto;
    ul:first-of-type{ flex: 1;}
`

const LinksList = styled(Flex)`
    list-style-type: none;

    li:not(:last-of-type) {
        margin-right: 1rem;
    }
    a {
        cursor: pointer;
    }
`

export default function Footer({ expanded }) {
    return (
        <FooterContainer expanded={expanded}>       
            <Flex h="space-between" v="center" flexWrap="wrap">
                <LinksList as="ul" flexWrap="wrap">
                    <li>&copy; Codeshare</li>
                    <Link href="/privacy-policy">
                        <li><a>Privacy & Policy</a></li>
                    </Link>
                    <Link href="/terms">
                        <li><a>Terms of Service</a></li>
                    </Link>
                </LinksList>
                <LinksList as="ul" flexWrap="wrap" h="flex-end">
                    <li><Icon name="instagram" type="primary" size={18}/></li>
                    <li><Icon name="twitch" type="primary" size={18}/></li>
                </LinksList>
            </Flex>
        </FooterContainer>
    )
}
