import React from 'react'
import styled from 'styled-components'

function ButtonSvg(props) {
  return (
    <StyledButtonSvg onClick={props.onClick} className={props.className}>
      {props.children}
    </StyledButtonSvg>
  )
}

const StyledButtonSvg = styled.button`
  svg {
    fill: #fff;
  }

  &:hover svg {
    fill: var(--primary);
  }
`

export default ButtonSvg
