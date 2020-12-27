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
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 24.3L25.3 44.6L47.6 24.3L25.3 4L3 24.3ZM25.2 29.5L19.5 24.3L25.2 19.1L30.9 24.3L25.2 29.5ZM19.6 34.6L8.3 24.3L19.6 14L22.5 16.7L14.1 24.3L22.5 31.9L19.6 34.6ZM28.1 31.8L36.4 24.3L28 16.7L30.9 14L42.2 24.3L31.1 34.5L28.1 31.8Z"
            fill="white"
        />
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

