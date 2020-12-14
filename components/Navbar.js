import Logo from './Logo'
import { Button } from "../components/Button"
import Flex from './Flex'
import Link from "next/link"
import { useSession, signOut } from "next-auth/client"
import styled from "styled-components"

const List = styled(Flex)`
    list-style-type: none;
    
    li { display: inline-block;}

    & > *:not(:last-child){
        margin-right: ${props => props.horizontal ? props.margin : "0"};
    }
`

const NavMenu = styled(Flex)`
    padding-top: 1.5rem;
    width: 90%;
    max-width: 1200px;
    a {
        cursor: pointer;
    }
    nav {
        animation: fadeIn 1s;
    }
    @keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }
`

export default function Navbar() {
    const [session] = useSession();

    return (
        <NavMenu h="space-between" v="center" as="header" auto>
            <Logo size={30}/>
            <nav>
                <List horizontal margin="2rem" v="center" as="ul">
                    <Link href="/snippets">
                        <li><a>Snippets</a></li>
                    </Link>
                    {
                        session ?
                        <Button type="primary" onClick={signOut}>Share code</Button>
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
