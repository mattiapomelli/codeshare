import { NavItem } from "./elements/BaseElements"
import { Flex, Logo } from "./elements/MainElements"
import Link from "next/link"

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
                    <NavItem>
                        <Link href="/snippets">
                            <a>
                                <span className="material-icons icon">home</span>
                                <span className="menu-text">Home</span>
                            </a>
                        </Link>
                    </NavItem>     
                    <NavItem active>
                        <Link href="/snippets">
                            <a>
                                <span className="material-icons icon">code</span>
                                <span className="menu-text">Snippets</span>
                            </a>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/snippets">
                            <a>
                                <span className="material-icons icon">person</span>
                                <span className="menu-text">Profile</span>
                            </a>
                        </Link>
                    </NavItem>
                </ul>
            </Flex>
        </header>
    )
}
