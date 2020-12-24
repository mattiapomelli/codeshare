import styled from "styled-components"
import { Icon } from "../Icon/Icon"

export const EditorArea = styled.div`
    grid-area: editor;
    height: 55vh;
    display: flex;
    flex-direction: column;
    & > div { flex: 1; }
`

export const InfoArea = styled.div`
    grid-area: info;
    display: flex;
    align-items: center;
    div:first-child{
        flex: 1;
        margin-right: 10px;
        input {
            width: 100%;
        }
    }
`

export const DescriptionArea = styled.div`
    grid-area: description;
    display: flex;
    flex-direction: column;
    div {
        border-radius: ${props => props.theme.borderRadius};
        overflow: hidden;
        position: relative;
        flex: 1;
        &::after {  /* Square to hide corner of scrollbars */
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20px;
            height: 20px;
            background-color: ${props => props.theme.colors.elements};;
        }
        &::before {  /* Square to hide corner of scrollbars */
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 20px;
            background-color: ${props => props.theme.colors.elements};;
        } 
    }
    textarea { height: 100% }
    label { position: relative } 
`

export const SubmitArea = styled.div`
    grid-area: submit;
    text-align: right;
`

export const EditorForm = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 300px auto;
    grid-template-areas:
        "info"
        "editor"
        "description"
        "submit";
    grid-gap: 10px 20px;

    @media only screen and (min-width: 1200px){
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "editor info"
            "editor description"
            "submit submit";
    }
`

export const InfoIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 5px;
    cursor: pointer;
`

export const TextLimiter = styled.p`
    text-align: right;
    font-size: 0.8rem;
    color: ${props=>props.error?"red":props.theme.colors.secondaryText}
`