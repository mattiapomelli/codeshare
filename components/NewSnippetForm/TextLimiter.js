import styled from 'styled-components'

export const Text = styled.p`
    text-align: right;
    font-size: 0.8rem;
    color: ${props=>props.error?"red":props.theme.colors.secondaryText};
    position: absolute;
    bottom: -1.2rem;
    right: 0.5rem;
`

export default function TextLimiter({ value, limit }) {
    return (
        <Text
            error={value.length > limit}
        >
            {value.length}/{limit}
        </Text>
    )
}
