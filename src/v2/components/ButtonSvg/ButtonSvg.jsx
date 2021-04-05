import React from 'react'
import styled from 'styled-components'

const ButtonSvg = (props) => {
  return <StyledButtonSvg {...props}>{props.children}</StyledButtonSvg>
}

const StyledButtonSvg = styled(({ rotate, isActive, ...props }) => <button {...props} />)`
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
    fill: ${(props) => (props.isActive ? 'var(--primary)' : '#fff')};
  }

  &:hover svg {
    fill: var(--primary);
  }
`

export default ButtonSvg
