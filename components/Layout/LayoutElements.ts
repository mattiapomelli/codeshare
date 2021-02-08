import styled, { css } from 'styled-components'

export const Main = styled.main`
	padding: 0.5rem 0 4rem 0;
	flex: 1;
`

export const Page = styled.section<{ collapsed: boolean }>`
	margin-left: 0;
	min-height: 100vh;
	transition: 300ms margin-left;
	display: flex;
	padding: 0 1.2rem;
	flex-direction: column;

	@media ${props => props.theme.breakpoints.tablet} {
		margin-left: ${props => props.theme.sidebarWidthCollapsed};
		padding: 0 3rem;

		${props =>
			props.collapsed &&
			css`
				margin-left: ${props => props.theme.sidebarWidth};
			`}
	}

	@media ${props => props.theme.breakpoints.desktop} {
		margin-left: ${props => props.theme.sidebarWidth};

		${props =>
			props.collapsed &&
			css`
				margin-left: ${props => props.theme.sidebarWidthCollapsed};
			`}
	}
`

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: ${props => props.theme.headerHeight};
	transition: width 300ms, padding 300ms;
`
