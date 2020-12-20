import styled from "styled-components"

const Flex = styled.div`
    display: flex;
    justify-content: ${props => props.h};
    align-items: ${props => props.v};
    flex-direction: ${props => props.dir || "row"};
    width: ${props => props.w || "auto"};
    margin: ${props => props.auto ? "auto" : 0};
    flex-wrap: ${props => props.flexWrap || "nowrap"};
`

export default Flex