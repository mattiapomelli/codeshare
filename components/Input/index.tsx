import { FunctionComponent, InputHTMLAttributes } from 'react'
import Icon, { IconName } from '../Icon'
import { Input, InputWrapper, InputProps } from './styles'
export default Input

interface IconInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputProps {
  icon: IconName
  iconSize?: number
  className?: string
  style?: React.CSSProperties
}

export const IconInput: FunctionComponent<IconInputProps> = ({
  icon,
  className,
  style,
  iconSize,
  ...rest
}) => {
  return (
    <InputWrapper className={className} style={style}>
      <Icon icon={icon} size={iconSize} />
      <Input {...rest} />
    </InputWrapper>
  )
}
