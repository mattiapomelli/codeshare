import styled, { css } from "styled-components"

export const Main = styled.main`
    padding: 0.5rem 2rem 4rem 2rem;
    margin: auto;
    @media ${props => props.theme.breakpoints.tablet} {
        padding: 0.5rem 3rem 4rem 3rem;
    }
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
    padding: 0 2rem;
    width: 100%;
    height: ${props => props.theme.headerHeight};
    transition: width 300ms, padding 300ms;
    @media ${props => props.theme.breakpoints.tablet} {
        padding: 0 3rem;
    }
`

