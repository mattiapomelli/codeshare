import * as icons from './icons'
import styled from "styled-components"

const SVG = styled.svg`
    fill: ${props => props.secondary ? props.theme.colors.details :  props.theme.colors.text};
    width: ${props => (props.size ? `${props.size}px` : '24px')};
    height: ${props => (props.size ? `${props.size}px` : '24px')};
`

export const Icon = ({ name, ...rest }) => {
    const Path = icons[name]

    return (
        <SVG
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...rest}
        >
            <Path/>
        </SVG>
    )
}