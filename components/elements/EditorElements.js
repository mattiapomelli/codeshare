import styled from 'styled-components'

export const EditorWrapper = styled.div`
    border: 1px solid #ddd;
    min-height: 300px;
    border-radius: 0.4em;

    & textarea {
        border: none;
        background-color: transparent;
        resize: none;
        outline: none;
        caret-color: black;
        padding: 20px 20px 20px 20px !important;
        overflow-x: scroll;
        font-size: 16px !important;
        color: transparent !important;
    }

    & textarea::selection {
        background-color: rgb(199, 199, 199) !important;
    }

    & pre {
        padding: 20px 20px 20px 20px !important;
        font-size: 16px !important;
    }

    & code {
        white-space: pre-wrap !important;
    }
`

export const Dropdown = styled.div`
    position: relative;
    flex: 1;
    height: 100%;
    align-self: flex-end;
    border-radius: 0.4em;
    overflow: hidden;
    border: 1px solid #333;

    & select{
        cursor: pointer;
        height: 100%;
        width: 100%;
        border: none;
        padding: 0.6em 1em;
        margin: 0;
        font-family: inherit;
        font-size: 0.8em;
        outline: none;
        color: black;
        background-color: transparent;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        position: relative;

        &:focus, &:hover {
            outline: none;
            border: none;
            background-color: #eee;
        }
    }

    &::after {
        content: "";
        position: absolute;
        width: 0; 
        height: 0; 
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid black;
        top: 50%;
        transform: translateY(-50%);
        right: 0.6em;
    }
`

export const TextArea = styled.textarea`
    resize: none;
    width: 100%;
    background-color: #eee;
    outline: none;
    border: none;
    padding: 10px 20px;
    margin-bottom: 1em;
    border-radius: 0.4em;
    font-size: 1em;
    font-family: inherit;
`

export const Container = styled.div`
    width: 90%;
    max-width: 600px;
    margin: auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    font-size: 1.1em;
`

export const Header = styled.div`
    display: flex;
    margin-bottom: 1em;

    & input {
        font-family: inherit;
        padding: 0.5em 1em;
        width: 60%;
        margin-right: 1em;
        background-color: transparent;
        outline: none;
        border: none;
        border-bottom: 1px solid black;
        color: black;
        font-size: 1.2em;
    }
`

export const SubmitButton = styled.button`
    font-family: inherit;
    margin-top: 1em;
    padding: 0.6em;
    font-size: 0.9em;
    font-weight: 400;
    color: white;
    text-transform: uppercase;
    background-color: #26282c;
    border: none;
    outline: none;
    border-radius: 0.4em;
    cursor: pointer;

    &:hover:not(:disabled) {
        background-color: #14171a;
    }
    &:disabled {
        opacity: 85%;
        cursor: not-allowed;
    }
`
