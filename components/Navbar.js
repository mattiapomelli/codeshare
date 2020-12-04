import {  NavMenu, List, Logo } from "./elements/MainElements"
import { Button } from "../components/Button"
import Link from "next/link"
import { useSession, signOut } from "next-auth/client"

export default function Navbar() {
    const [session] = useSession();

    return (
        <NavMenu h="space-between" v="center" as="header" auto>
            <Link href="/">
                <Logo v="center" h="center">
                    <span className="material-icons">change_history</span>
                    <h1 className="menu-text">Codeshare</h1>
                </Logo>
            </Link>
            <nav>
                <List horizontal margin="2rem">
                    <Link href="/snippets">
                        <li><a>Snippets</a></li>
                    </Link>
                    <Link href="/snippets">
                        <li><a>Snippets</a></li>
                    </Link>
                    {
                        session ?
                        <Button type="primary" onClick={signOut}>Logout</Button>
                        : 
                        <Link href="/signup">
                            <Button type="primary">Sign up</Button>
                        </Link>
                    }

                </List>
            </nav>
        </NavMenu>
    )
}
