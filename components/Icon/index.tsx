import * as icons from './icons'
import type { IconNames } from './icons'
import styled from 'styled-components'
import { StyledIconButton } from './styles'

export type IconType = 'primary' | 'inverted'
export type IconName = IconNames

interface SVGProps {
	variant?: IconType
	size?: number
}

interface IconProps extends SVGProps {
	icon: IconName
}

const SVG = styled.svg<SVGProps>`
	fill: ${props => {
		switch (props.variant) {
			case 'primary':
				return 'white'
			case 'inverted':
				return props.theme.colors.background
			default:
				return props.theme.colors.details
		}
	}};
	width: ${props => (props.size ? `${props.size / 16}rem` : '1.5rem')};
	height: ${props => (props.size ? `${props.size / 16}rem` : '1.5rem')};
`

const Icon = ({ icon, ...rest }: IconProps) => {
	const Path = icons[icon]

	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
			<Path />
		</SVG>
	)
}

export default Icon

export const IconButton = ({ icon, ...rest }: { icon: IconName }) => {
	return (
		<StyledIconButton {...rest}>
			<Icon icon={icon} variant="primary" />
		</StyledIconButton>
	)
}
