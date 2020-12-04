import { SidebarLayout, SideNavItem } from './SidebarElements'
import Flex from "../Flex"
import Logo from '../Logo'
import { Icon } from '../Icon/Icon'
import { useRouter } from 'next/router'
import Link from "next/link"

const NavLink = ({ children, href, icon}) => {
    const router = useRouter()

    return (
        <SideNavItem active={router.pathname === href}>
            <Link href={href}>
                <a>
                    <Icon name={icon} size={18}/> 
                    <span className="menu-text">{children}</span>
                </a>
            </Link>
        </SideNavItem>
    )
}

export default function Sidebar({ collapsed }) {
    return (
        <SidebarLayout collapsed={collapsed}>
            <header>
                <Logo size={32}/>
                <Flex dir="column" v="center" h="center" as="nav" auto>
                    <ul>
                        <NavLink href="/" icon="home">Home</NavLink>     
                        <NavLink href="/snippets" icon="code">Snippets</NavLink>     
                        <NavLink href="/editor" icon="user">Editor</NavLink>     
                    </ul>
                </Flex>
            </header>
        </SidebarLayout>
    )
}

