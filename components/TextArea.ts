import styled from 'styled-components'

export const TextArea = styled.textarea`
	border: none;
	outline: none;
	font-family: inherit;
	font-size: 0.8rem;
	font-weight: 500;
	padding: 20px;
	border-radius: ${(props) => props.theme.borderRadius};
	background-color: ${(props) => props.theme.colors.elements};
	color: ${(props) => props.theme.colors.text};
	resize: none;
	display: block;
	width: 100%;

	::placeholder {
		color: ${(props) => props.theme.colors.secondaryText};
	}

	&::-webkit-scrollbar {
		height: 10px;
		width: 10px;
	}
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background: rgba(124, 124, 124, 0.1);
	}
	&::-webkit-scrollbar-thumb:hover {
		background: rgba(124, 124, 124, 0.3);
	}
	::-webkit-scrollbar-corner {
		background: transparent;
	}
`
