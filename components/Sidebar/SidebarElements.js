import styled, { css } from "styled-components"

export const SideNavItem = styled.li`
    font-size: 0.9rem;
    font-weight: 600;
    width: 100%;
    border-radius: 10em;
    margin-bottom: 0.6rem;
    animation: fadeIn 1s;
    @keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: ${props => props.theme.colors.text};
        text-decoration: none;
        line-height: 1;
    }
    svg {
        color: ${props => props.theme.colors.details};
        font-size: 1.2rem;
    }
    span {
        margin-left: 10px;
    }
    ${props => props.active && css`
        background: ${props => props.theme.colors.primary};
        .icon { color: ${props => props.theme.colors.text}; }
    `}

    &:hover { background-color: ${props => props.theme.colors.elements}}
`

const normalSidebarStyles = css`
    width: ${props => props.theme.sidebarWidth};

    .menu-text{
        display: inline-block;
    }
    header {
        padding: 0 20px;
        ${SideNavItem} {
            border-radius: 10em;
            a {
                padding: 1.2em 3.4em 1.2em 2.4em;
            }
        }
    }
`

const collapsedSidebarStyles = css`
    width: ${props => props.theme.sidebarWidthCollapsed};

    .menu-text {
        display: none;
    }
    header {
        padding: 0;
        ${SideNavItem} {
            border-radius: 50%;
            a {
                padding: 1.2em 1.2em 1.2em 1.2em;
            }
        }
    }
`

export const SidebarLayout = styled.aside`
    background-color: ${props => props.theme.colors.sidebar};
    position: fixed;
    height: 100%;
    top: 0;
    left: ${props => "-" + props.theme.sidebarWidth};
    width: ${props => props.theme.sidebarWidth};
    transition: width 200ms, left 200ms;
    z-index: 7;
    overflow: hidden;
    ${normalSidebarStyles};

    header{ margin-top: 35px; }
    nav {
        margin-top: 2rem;
        width: 80%; 
    }

    ${props => props.collapsed && css`
        left: 0;
    `}

    @media ${props => props.theme.breakpoints.tablet} {
        ${collapsedSidebarStyles};
        left: 0;

        &:hover {
            ${normalSidebarStyles};
        }

        ${props => props.collapsed && css`
            ${normalSidebarStyles};
        `}
    }

    @media ${props => props.theme.breakpoints.desktop} {
        ${normalSidebarStyles};

        ${props => props.collapsed && css`
            ${collapsedSidebarStyles};

            &:hover {
                ${normalSidebarStyles};
            }
        `}
    }
`

