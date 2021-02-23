import styled, { css } from 'styled-components'

export const H1 = styled.h1`
  font-size: 3.3rem;
  letter-spacing: -2px;
  font-weight: 400;
  color: white;
  margin-bottom: 1.5rem;
`

export const H2 = styled.h2<{ overflowWrap?: boolean }>`
  font-size: 2.5rem;
  letter-spacing: -2px;
  font-weight: 400;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1;
  ${(props) =>
    props.overflowWrap &&
    css`
      overflow-wrap: break-word;
      max-width: 100%;
    `}
`

export const Label = styled.label<{ small?: boolean; inline?: boolean }>`
  font-size: ${(props) => (props.small ? '0.8rem' : '0.9rem')};
  font-weight: ${(props) => (props.small ? '300' : '500')};
  margin-left: 5px;
  margin-bottom: 5px;
  display: ${(props) => (props.inline ? 'inline-block' : 'block')};
  cursor: inherit;
`

export const P = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  margin: 0.7rem 0;
`
