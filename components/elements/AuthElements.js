import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 320px;
    margin: auto;
 /*    background-color: #fbfdff;
    border: 1px solid  rgb(218, 218, 218); */
    padding: 2em 1.5em;
    margin-top: 4rem;
    border-radius: 0.8em;

    & h1 {
        margin-bottom: 1rem;
    }
    & p {
        font-size: 0.8em;
        & a {
            color: rgb(43, 43, 170);
            &:hover {
                text-decoration: underline;
            }
        }
    }

    & input {
        font-family: inherit;
        outline: none;
        padding: 1em 1.5em;
        margin-bottom: 1em;
        width: 100%;
        border: 1px solid rgb(218, 218, 218);
        border-radius: 0.8em;
    }
    & button {
        font-family: inherit;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 1em 2em;
        background-color: rgb(205, 255, 247);
        width: 100%;
        border: 1px solid rgb(218, 218, 218);
        border-radius: 0.8em;

        &:hover {
            background-color: rgb(177, 238, 228);
        }
    }

    & hr {
        width: 100%;
        margin: 0.7em 0;
    }
`