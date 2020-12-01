import styled, { css } from "styled-components"

const normalSidebarStyles = css`
    width: ${props => props.theme.sidebarWidth};

    .menu-title {
        display: inline-block;
    }
    header {
        padding: 0 20px;
        li {
            padding: 1.4em 2em 1.4em 2em;
            border-radius: ${props => props.theme.borderRadius};
            span {
                margin-right: 10px;
            }
        }
    }
`

const collapsedSidebarStyles = css`
    width: ${props => props.theme.sidebarWidthCollapsed};

    .menu-title {
        display: none;
    }
    header {
        padding: 0;
        li {
            padding: 1.4em 1.4em 1.4em 1.4em;
            border-radius: 50%;
            span {
                margin-right: 0px;
            }
        }
    }
`

export const Sidebar = styled.aside`
    background-color: white;
    border-right: 3px solid ${props => props.theme.colors.lightGrey};
    position: fixed;
    height: 100%;
    top: 0;
    left: ${props => "-" + props.theme.sidebarWidth};
    width: ${props => props.theme.sidebarWidth};
    transition: width 200ms, left 200ms;
    z-index: 7;
    overflow: hidden;
    padding-top: 25px;

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
    padding-top: calc(${props => props.theme.headerHeight} + 30px);
    /* padding-right: 75px;
    padding-left: 75px; */
    width: 92%;
    margin: auto;
    padding-bottom: 75px;
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
    background-color: white;
    border-bottom: 3px solid ${props => props.theme.colors.lightGrey};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4%;
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

