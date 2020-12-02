import styled, { css } from "styled-components"

const normalSidebarStyles = css`
    width: ${props => props.theme.sidebarWidth};

    .menu-text{
        display: inline-block;
    }
    header {
        padding: 0 20px;
        li {
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
        li {
            border-radius: 50%;
            a {
                padding: 1.2em 1.2em 1.2em 1.2em;
            }
        }
    }
`

export const Sidebar = styled.aside`
    background-color: ${props => props.theme.colors.sidebar};
    position: fixed;
    height: 100%;
    top: 0;
    left: ${props => "-" + props.theme.sidebarWidth};
    width: ${props => props.theme.sidebarWidth};
    transition: width 200ms, left 200ms;
    z-index: 7;
    overflow: hidden;
    padding-top: 35px;

    nav { margin-top: 2rem; width: 80%;}

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

export const Main = styled.main`
    padding: 0.5rem 3rem 75px 3rem;       // top + calc(${props => props.theme.headerHeight}
    margin: auto;
`

export const Page = styled.section`
    padding-left: 0;
    min-height: 100%;
    transition: 300ms padding-left;

    @media ${props => props.theme.breakpoints.tablet} {
        padding-left: ${props => props.theme.sidebarWidthCollapsed};

        ${props => props.collapsed && css`
            padding-left: ${props => props.theme.sidebarWidth};
        `}
    }

    @media ${props => props.theme.breakpoints.desktop} {
        padding-left: ${props => props.theme.sidebarWidth};

        ${props => props.collapsed && css`
            padding-left: ${props => props.theme.sidebarWidthCollapsed};
        `}
    }
`

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    position: ${props => props.fixed ? "fixed" : "block"};
    top: 0;
    width: 100%;
    height: ${props => props.theme.headerHeight};
    transition: width 300ms, padding 300ms;
    z-index: 5;

    ${props => props.fixed && css`
        @media ${props => props.theme.breakpoints.tablet} {
            width: calc(100% - ${props => props.theme.sidebarWidthCollapsed});

            ${props => props.collapsed && css`
                width: calc(100% - ${props => props.theme.sidebarWidth});
            `}
        }

        @media ${props => props.theme.breakpoints.desktop} {
            width: calc(100% - ${props => props.theme.sidebarWidth});

            ${props => props.collapsed && css`
                width: calc(100% - ${props => props.theme.sidebarWidthCollapsed});
            `}
        }
    `}
`

