import { useEffect } from 'react'
import { SidebarLayout, SideNavItem } from './SidebarElements'
import Flex from "../Flex"
import Logo from '../Logo'
import { Icon } from '../Icon/Icon'
import { useRouter } from 'next/router'
import Link from "next/link"
import styled from 'styled-components'

const CloseIcon = styled(Icon)`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    @media ${props => props.theme.breakpoints.tablet} {
        display: none;
    }
`

const NavLink = ({ children, href, icon, onClick}) => {
    const router = useRouter()
    const active = router.pathname === href

    return (
        <SideNavItem active={active} onClick={onClick}>
            <Link href={href}>
                <a>
                    <Icon name={icon} size={18} type={active ? "primary" : "secondary"}/> 
                    <span className="menu-text">{children}</span>
                </a>
            </Link>
        </SideNavItem>
    )
}

export default function Sidebar({ collapsed, setCollapsed }) {

    const closeSidebar = () => {
        console.log('yo')
        if(window.matchMedia("(max-width: 600px)").matches) {
            setCollapsed(false)
            console.log('h')
        }
    }

    return (
        <SidebarLayout collapsed={collapsed}>
            <CloseIcon name="cross" type="primary" onClick={closeSidebar}/>
            <header>
                <Logo size={32}/>
                <Flex dir="column" v="center" h="center" as="nav" auto>
                    <ul>
                        <NavLink href="/" icon="home">Home</NavLink>     
                        <NavLink href="/snippets" icon="feed" onClick={closeSidebar}>Snippets</NavLink>     
                        <NavLink href="/editor" icon="code" onClick={closeSidebar}>Editor</NavLink>     
                    </ul>
                </Flex>
            </header>
        </SidebarLayout>
    )
}

