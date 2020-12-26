import Link from "next/link"
import { useState } from "react"
import { Header, Page, Main } from "./LayoutElements"
import Sidebar from '../Sidebar/Sidebar'
import { Button, IconButton } from "../Button"
import Footer from "../Footer"

const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)

    const clickHandler = () => {
        setCollapsed(collapsed => !collapsed)
    }

    return (
        <>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <Page collapsed={collapsed}>
                <Header>
                    <IconButton  onClick={clickHandler} icon="menu" iconType="primary" />
                    <Link href="/editor">
                        <Button type="primary">Share code</Button>
                    </Link>
                </Header>
                <Main>
                    { children }
                </Main>
                <Footer expanded/>
            </Page>      
        </>
    )
}

export default Layout