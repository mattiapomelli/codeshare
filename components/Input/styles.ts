import styled from 'styled-components'

export interface InputProps {
  big?: boolean
  small?: boolean
}

export const Input = styled.input<InputProps>`
  border: none;
  outline: none;
  font-family: inherit;
  font-size: ${(props) => (props.big ? '0.9rem' : '0.8rem')};
  font-weight: 500;
  padding: ${(props) =>
    props.small ? '0.7em 1.4em 0.7em 20px' : '1.1em 1.4em 1.1em 20px'};
  border-radius: 10em;
  background-color: ${(props) => props.theme.colors.elements};
  color: ${(props) => props.theme.colors.text};

  @media ${(props) => props.theme.breakpoints.tablet} {
    min-width: 16rem;
  }

  ::placeholder {
    color: ${(props) => props.theme.colors.secondaryText};
  }
`

export const InputWrapper = styled.div`
  display: inline-block;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
  }

  ${Input} {
    padding-left: 2.8rem;
    width: 100%;
  }
`
