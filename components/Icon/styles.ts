import styled from 'styled-components'

export const StyledIconButton = styled.button`
	border: none;
	outline: none;
	font-size: 0.8rem;
	cursor: pointer;
	text-align: center;
	padding: 0.9em;
	border-radius: 1.2em;
	line-height: 1;

	background: ${props => props.theme.colors.elements};

	color: ${props => props.theme.colors.text};

	&:hover:not(:disabled) {
		background: ${props => props.theme.colors.accent};
	}
`
