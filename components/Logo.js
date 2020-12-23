import Link from "next/link"
import styled from "styled-components"
import Flex from './Flex'

const LogoWrapper = styled(Flex).attrs(props => ({
    dir: props.vertical ? "column" : "row"
}))`
    color: white;
    cursor: pointer;
    h1 {
        line-height: 1;
        margin-left: 5px;
        font-size: 1.3rem;
        margin-top: ${props => props.vertical ? "0.5rem" : 0}
    }
    span { font-size: 30px}
`

const LogoSVG = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 21L21.2571 10L33.5143 21L21.2571 32L9 21Z" fill="#262739" stroke="white" strokeWidth="11"/>
        <path d="M24.4828 29.1052L33.5144 21L24.4828 12.8947" stroke="#262739" strokeWidth="4"/>
        <path d="M18.0316 12.8947L9 20.9999L18.0316 29.1052" stroke="#262739" strokeWidth="4"/>
    </svg>
)

export default function Logo({ size, noText, href, ...rest }) {
    return (
        <Link href={href || "/"}>
            <LogoWrapper v="center" h="center" {...rest}>
                <LogoSVG size={size || "42px"}/>
                {!noText && <h1 className="menu-text">Codeshare</h1>}
            </LogoWrapper>
        </Link>
    )
}

