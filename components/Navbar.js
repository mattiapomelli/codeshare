import { useState } from 'react'
import Logo from './Logo'
import { Button } from "../components/Button"
import { Icon } from '../components/Icon/Icon'
import Flex from './Flex'
import Link from "next/link"
import { useSession, signOut } from "next-auth/client"
import styled, { css } from "styled-components"

const List = styled.ul`
    list-style-type: none;
    position: absolute;
    top: 0.8rem;   
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    padding-top: 4rem;
    background-color: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius};
    border: 1px solid ${props => props.theme.colors.details};
    z-index: 2;

    ${props => !props.show && css`
        display: none;
    `};
    
    li { display: inline-block; margin-bottom: 1rem;}

    @media ${props => props.theme.breakpoints.tablet} {
        display: block;
        position: inherit;
        width: auto;
        flex-direction: row;
        border: none;
        padding: 0;
        & > *:not(:last-child){
            margin-right: ${props => props.horizontal ? props.margin : "0"};
        }
        animation: fadeIn 1s;
        @keyframes fadeIn {
            0% {
                opacity:0;
            }
            100% {
                opacity:1;
            }
        }
    }
`

const NavMenu = styled(Flex)`
    padding-top: 1.5rem;
    width: 90%;
    max-width: 1200px;
    a {
        cursor: pointer;
    }
`

const HamIcon = styled(Icon)`
    z-index: 30;
    position: relative;
    @media ${props => props.theme.breakpoints.tablet} {
        display: none;
    }
`

export default function Navbar() {
    const [session] = useSession();
    const [showNavbar, setShowNavbar] = useState(false);

    return (
        <NavMenu h="space-between" v="center" as="header" auto>
            <Logo size={30}/>
            <nav>
                <List horizontal margin="2rem" v="center" as="ul" show={showNavbar}>
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
                <HamIcon name={showNavbar ? "cross" : "menu"} type="primary" onClick={() => setShowNavbar(prev => !prev)}/>
            </nav>
        </NavMenu>
    )
}
