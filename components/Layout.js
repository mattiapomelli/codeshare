import Link from "next/link"
import { useState } from "react"
import { Header, Sidebar, Page, Main } from "../components/elements/LayoutElements"
import { Button, IconButton } from "./elements/BaseElements"
import SideNav from "./SideNav"

const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)

    const clickHandler = () => {
        setCollapsed(collapsed => !collapsed)
    }

    return (
        <>
            <Sidebar collapsed={collapsed}>
                <SideNav/>
            </Sidebar>
            <Page collapsed={collapsed}>
                <Header collapsed={collapsed}>
                    <IconButton  onClick={clickHandler}>
                        <span className="material-icons">menu</span>
                    </IconButton>
                    <Link href="/editor">
                        <Button type="primary">Share code</Button>
                    </Link>
                </Header>
                <Main>
                    { children }
                </Main>
            </Page>      
        </>
    )
        
}

export default Layout