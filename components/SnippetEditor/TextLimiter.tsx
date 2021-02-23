import { FunctionComponent } from 'react'
import styled from 'styled-components'

export const Text = styled.p<{ error: boolean }>`
  text-align: right;
  font-size: 0.8rem;
  color: ${(props) => (props.error ? 'red' : props.theme.colors.secondaryText)};
  position: absolute;
  bottom: -1.2rem;
  right: 0.5rem;
`

interface TextLimiterProps {
  value: string
  limit: number
}

const TextLimiter: FunctionComponent<TextLimiterProps> = ({ value, limit }) => {
  return (
    <Text error={value.length > limit}>
      {value.length}/{limit}
    </Text>
  )
}

export default TextLimiter
