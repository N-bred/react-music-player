import React from 'react'
import styled from 'styled-components'

function ButtonSvg(props) {
  return (
    <StyledButtonSvg onClick={props.onClick} className={props.className} rotate={props.rotate}>
      {props.children}
    </StyledButtonSvg>
  )
}

const StyledButtonSvg = styled.button`
  background: transparent;
  width: 100%;
  border: none;
  width: 5rem;
  height: 5rem;
  padding: 1.5rem;
  cursor: pointer;

  transform: ${(props) => (props.rotate ? 'rotateY(180deg)' : 'none')};

  &:focus {
    outline: none;
  }

  svg {
    fill: #fff;
  }

  &:hover svg {
    fill: var(--primary);
  }
`

export default ButtonSvg
