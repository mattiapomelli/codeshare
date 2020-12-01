import { Flex, List, NavItem } from "./elements/MainElements"

export default function SideNav() {
    return (
        <Flex h="space-between" v="center" dir="column" as="header">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span className="material-icons" style={{fontSize: '30px'}}>stop_circle</span>
                <h1 className="menu-title">Codeshare</h1>
            </div>
            <nav>
                <List vertical>
                    <NavItem><span className="material-icons">home</span><span className="menu-title">Home</span></NavItem>
                    <NavItem><span className="material-icons">code</span><span className="menu-title">Snippets</span></NavItem>
                    <NavItem><span className="material-icons">person</span><span className="menu-title">Profile</span></NavItem>
                </List>
            </nav>
        </Flex>
    )
}
