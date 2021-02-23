import { FunctionComponent } from 'react'
import { SidebarLayout, SideNavItem } from './styles'
import Flex from '@/components/Flex'
import Logo from '@/components/Logo'
import Icon, { IconName } from '@/components/Icon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  @media ${(props) => props.theme.breakpoints.tablet} {
    display: none;
  }
`

interface NavLinkProps {
  children: string
  href: string
  icon: IconName
  onClick: () => void
}

const NavLink: FunctionComponent<NavLinkProps> = ({
  children,
  href,
  icon,
  onClick,
}) => {
  const router = useRouter()
  const active = router.pathname === href

  return (
    <SideNavItem active={active} onClick={onClick}>
      <Link href={href}>
        <a>
          <Icon icon={icon} size={18} variant={active ? 'primary' : null} />
          <span className="menu-text">{children}</span>
        </a>
      </Link>
    </SideNavItem>
  )
}

interface SidebarProps {
  collapsed?: boolean
  setCollapsed: (collapsed: boolean) => void
}

const Sidebar: FunctionComponent<SidebarProps> = ({
  collapsed,
  setCollapsed,
}) => {
  const [session] = useSession()

  const closeSidebar = () => {
    if (window.matchMedia('(max-width: 800px)').matches) {
      setCollapsed(false)
    }
  }

  return (
    <SidebarLayout collapsed={collapsed}>
      <span onClick={closeSidebar}>
        <CloseIcon icon="cross" variant="primary" />
      </span>
      <header>
        <Logo size={32} href={session ? '/snippets' : '/'} />
        <Flex dir="column" v="center" h="center" as="nav" auto>
          <ul>
            <NavLink href="/snippets" icon="feed" onClick={closeSidebar}>
              Snippets
            </NavLink>
            {session && (
              <>
                <NavLink href="/editor" icon="code" onClick={closeSidebar}>
                  Editor
                </NavLink>
                <NavLink href="/profile" icon="user" onClick={closeSidebar}>
                  Profile
                </NavLink>
              </>
            )}
          </ul>
        </Flex>
      </header>
    </SidebarLayout>
  )
}

export default Sidebar
