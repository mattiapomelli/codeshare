import styled from "styled-components"

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 17.25rem;
    margin: 3.2rem auto 0 auto;

    h3 {
        margin-bottom: 2rem;
    }

    .input-field {
        width: 100%;
        margin-bottom: 1rem;
    }

    button {
        width: 100%;
    }

    hr {
        margin: 1rem 0;
        width: 90%;
    }

    p {
        margin-top: 2rem;
        font-size: 0.8rem;
        a {
            color: #0880B9;
            text-decoration: none;
            &:hover { text-decoration: underline; }
        }
    }
`