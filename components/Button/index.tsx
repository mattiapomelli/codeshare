import { Button, StyledFlexButton, StyledIconButton } from './style'
import Icon, { IconType, IconName } from '../Icon'

export default Button

interface IconButtonProps {
	icon: IconName
	iconType: IconType
}

export const IconButton = ({ icon, iconType, ...rest }: IconButtonProps) => (
	<StyledIconButton {...rest}>
		<Icon name={icon} type={iconType} />
	</StyledIconButton>
)

interface FlexButtonProps {
	children: string
	icon: IconName
	iconType: IconType
	small: boolean
}

export const FlexButton = ({
	children,
	icon,
	iconType,
	small,
	...rest
}: FlexButtonProps) => {
	return (
		<StyledFlexButton {...rest} small={small}>
			{children}
			<Icon name={icon} size={small ? 12 : 20} type={iconType} />
		</StyledFlexButton>
	)
}
