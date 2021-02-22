import styled, { css } from 'styled-components'

export const DropdownMenu = styled.ul<{ right: boolean }>`
	list-style-type: none;
	position: absolute;
	top: 110%;
	border-radius: ${(props) => props.theme.borderRadius};
	background-color: ${(props) => props.theme.colors.elements};
	border: 1px solid ${(props) => props.theme.colors.details};
	padding: 0.5em;
	z-index: 3;
	right: 0;
	@media ${(props) => props.theme.breakpoints.tablet} {
		/* left: 0; */
		right: auto;
		${(props) =>
			props.right &&
			css`
				right: 0;
			`}
	}
`

export const DropdownItem = styled.li`
	font-size: 0.7rem;
	font-weight: 500;
	padding: 0.5em 2.5em;
	cursor: pointer;
	background-color: ${(props) => props.theme.colors.elements};
	border-radius: ${(props) => props.theme.borderRadius};
	&:hover {
		background-color: ${(props) => props.theme.colors.accent};
	}
`

export const DropdownWrapper = styled.div`
	position: relative;
	display: inline-block;
`
