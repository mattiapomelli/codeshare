import { useState } from "react"
import { Header, Sidebar, Page, Main } from "../components/elements/LayoutElements"
import { Button } from "../components/elements/MainElements"
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
                    <span className="material-icons" onClick={clickHandler}>menu</span>
                    <Button type="accent">Share code</Button>
                </Header>
                <Main>
                    { children }
                </Main>
            </Page>      
        </>
    )
        
}

export default Layout