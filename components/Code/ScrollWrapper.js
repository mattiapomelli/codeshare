import styled from "styled-components"

export const ScrollWrapper = styled.div`
    overflow: auto;
    height: ${props => props.height || "100%" };
    
    &::-webkit-scrollbar {
        height: 10px;
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(72, 72, 72, 0.3);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(72, 72, 72, 0.4);
    }
    ::-webkit-scrollbar-corner { background: transparent }
`