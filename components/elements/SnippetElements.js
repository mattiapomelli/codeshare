import styled from "styled-components"

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 0.8em;
    overflow: hidden;
    border: 1px solid #ddd;

    &:hover {
        box-shadow: 0 0 5px 1px  #e6e6e6;
    }
`

export const Header = styled.div`
    font-size: 1em;
    font-weight: 600;
    padding: 0.8em 30px;
    background-color: #ececec;
    color: black;
    cursor: pointer;

    &:hover{ color: rgb(73, 73, 73); }
`

export const Body = styled.div`
    flex: 1; /* makes it stretch to available space */
    display: flex;
    min-height: 200px;
    padding: 20px 0px 0px 30px;
    background-color: transparent;
`

export const ScrollWrapper = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    padding-bottom: 20px;
    padding-right: 20px;
    width: 100%;

    &::-webkit-scrollbar {
        height: 10px;
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(124, 124, 124, 0.2);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(124, 124, 124, 0.3);
    }
`

export const CopyButton = styled.button`
    padding: 0.5em 0.4em;
    font-family: inherit;
    outline: none;
    border: none;
    background-color: rgb(250, 250, 250);
    border: 1px solid rgb(224, 224, 224);
    color: #222;
    border-radius: 0.3em;
    cursor: pointer;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    font-size: 0.8em;
    line-height: 0.9em;

    &:hover { background-color: rgb(216, 216, 216); }

    &.copied {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        font-size: 0.8em;
        line-height: 0.9em;
        background-color: #fff !important;
        border-color: transparent !important;
    }
`

export const Tooltip = styled.span`
    border-radius: 0 0 0.25rem 0.25rem;
    color: black;
    font-size: 0.9em;
    letter-spacing: 0.025rem;
    padding: 0.3rem 0.7rem;
    position: absolute;
    right: 1rem;
    text-align: right;
    text-transform: uppercase;
    top: 0px;
`