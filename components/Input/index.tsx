import Icon, { IconName } from '../Icon'
import { Input, InputWrapper } from './styles'
export default Input

interface InputProps {
	icon: IconName
	iconSize: number
	className?: string
	style: React.CSSProperties
}

export const IconInput = ({
	icon,
	className,
	style,
	iconSize,
	...rest
}: InputProps) => {
	return (
		<InputWrapper className={className} style={style}>
			<Icon icon={icon} size={iconSize} />
			<Input {...rest} />
		</InputWrapper>
	)
}
