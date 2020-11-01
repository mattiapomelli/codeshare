import Link from "next/link"
import styled from "styled-components"

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    align-items: center;
    margin-bottom: 2rem;

    & nav {
        font-weight: 700;

        & a:not(:last-of-type) {
            margin-right: 1rem;
        }
    }

    & .logo {
        font-weight: 900;
        font-size: 1.2em;
    }

    & .cta {
        color: white;
        background-color: black;
        border-radius: 3em;
        width: 120px;
        padding: 0.5em 0.8em;

        &:hover {
            background-color: #222;
        }
    }
`

const Navbar = () => {

    return (
        <Header>
            <Link href="/">
                <a className="logo">&lt;CodeShare/&gt;</a>
            </Link>
            <nav>
                <Link href="/snippets">Snippets</Link>
                <Link href="/editor">
                    <a className="cta">Share code</a>
                </Link>
            </nav>
        </Header>
    )
}

export default Navbar