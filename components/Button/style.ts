import styled from 'styled-components'

interface ButtonProps {
	padding?: string
	small?: boolean
	borderRadius?: string
	type?: 'primary' | 'secomdary' | 'inverted'
	minWidth?: string
}

export const Button = styled.button<ButtonProps>`
	border: none;
	outline: none;
	font-family: inherit;
	font-size: 0.8rem;
	font-weight: 500;
	padding: ${props =>
		props.padding
			? props.padding
			: props.small
			? '1.1em 2.6em'
			: '1.4em 2.6em'};
	border-radius: ${props => props.borderRadius || '10em'};
	cursor: pointer;
	min-width: ${props => props.minWidth || 'auto'};
	text-align: center;

	background: ${props => {
		switch (props.type) {
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

	color: ${props => {
		switch (props.type) {
			case 'primary':
				return 'white'
			case 'inverted':
				return props.theme.colors.background
			default:
				return props.theme.colors.text
		}
	}};

	&:hover:not(:disabled) {
		background: ${props => {
			switch (props.type) {
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
`

export const StyledFlexButton = styled(Button)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	svg {
		margin-left: 5px;
	}
`

export const StyledIconButton = styled(Button).attrs<ButtonProps>(props => ({
	padding: props.small ? '0.5em' : '0.9em',
	borderRadius: '1.2em',
}))`
	line-height: 1;
`

export const Tab = styled.div<{ minWidth: string }>`
	font-size: 0.8rem;
	font-weight: 500;
	padding: 1.1em 2.6em;
	border-radius: 10em;
	min-width: ${props => props.minWidth || 'auto'};
	text-align: center;
	background-color: ${props => props.theme.colors.elements};
	color: ${props => props.theme.colors.text};
`
