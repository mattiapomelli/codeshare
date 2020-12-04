import Flex from "./Flex"
import { Icon } from './Icon/Icon'
import Link from "next/link"
import styled from "styled-components"

const NavItem = styled.li`
    font-size: 0.9rem;
    font-weight: 600;
    width: 100%;
    border-radius: 10em;
    margin-bottom: 0.6rem;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: ${props => props.theme.colors.text};
        text-decoration: none;
        line-height: 1;
    }
    svg {
        color: ${props => props.theme.colors.details};
        font-size: 1.2rem;
    }
    span {
        margin-left: 10px;
    }
    ${props => props.active && css`
        background: ${props => props.theme.colors.primary};
        .icon { color: ${props => props.theme.colors.text}; }
    `}

    &:hover { background-color: ${props => props.theme.colors.elements}}
`

const NavLink = ({ children, href, icon}) => (
    <NavItem>
        <Link href={href}>
            <a>
                <Icon name={icon} size={18}/> 
                <span className="menu-text">{children}</span>
            </a>
        </Link>
    </NavItem>
)

export default function SideNav() {
    return (
        <header>
            <Link href="/">
                <Logo v="center" h="center">
                    <span className="material-icons">change_history</span>
                    <h1 className="menu-text">Codeshare</h1>
                </Logo>
            </Link>
            <Flex dir="column" v="center" h="center" as="nav" auto>
                <ul>
                    <NavLink href="/snippets" icon="home">Home</NavLink>     
                    <NavLink href="/snippets" icon="code">Snippets</NavLink>     
                    <NavLink href="/snippets" icon="user">Profile</NavLink>     
                </ul>
            </Flex>
        </header>
    )
}
