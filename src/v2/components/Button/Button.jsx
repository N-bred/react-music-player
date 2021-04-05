import React from 'react'
import styled from 'styled-components'

const Button = ({ disabled, onClick, children }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  margin: 1.5rem 0;
  width: 100%;
  display: block;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid var(--primary);
  padding: 1rem 1.5rem;
  color: #fff;
  text-transform: uppercase;
  font-size: 1.3rem;
  transition-property: background, opacity;
  transition: 0.3s ease-in;
  cursor: pointer;

  :hover:not(:disabled) {
    background: var(--primary);
    color: #000;
    opacity: 0.8;
  }

  :focus {
    outline: none;
  }

  :disabled {
    background: #d4d4d4;
    color: #000;
  }
`

export default Button
