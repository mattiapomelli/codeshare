import styled from 'styled-components'

interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'inverted'
	small?: boolean
}

const Button = styled.button<ButtonProps>`
	border: none;
	outline: none;
	font-family: inherit;
	font-size: 0.8rem;
	font-weight: 500;
	padding: ${(props) => (props.small ? '1.1em 2.6em' : '1.4em 2.6em')};
	border-radius: 10em;
	cursor: pointer;
	text-align: center;

	background: ${(props) => {
		switch (props.variant) {
			case 'primary':
				return props.theme.colors.primary
			case 'inverted':
				return props.theme.colors.text
			case 'secondary':
				return props.theme.colors.accent
			default:
				return props.theme.colors.elements
		}
	}};

	color: ${(props) => {
		switch (props.variant) {
			case 'primary':
				return 'white'
			case 'inverted':
				return props.theme.colors.background
			default:
				return props.theme.colors.text
		}
	}};

	&:hover:not(:disabled) {
		background: ${(props) => {
			switch (props.variant) {
				case 'primary':
					return props.theme.colors.primaryHover
				case 'inverted':
					return 'white'
				case 'secondary':
					return props.theme.colors.details
				default:
					return props.theme.colors.accent
			}
		}};
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 60%;
	}

	display: inline-flex;
	align-items: center;
	justify-content: center;

	svg {
		margin-left: 5px;
	}
`

export default Button
