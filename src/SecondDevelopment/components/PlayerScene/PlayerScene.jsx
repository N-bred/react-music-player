import React from 'react'
import styled from 'styled-components'

function PlayerScene(props) {
  return (
    <StyledPlayerScene className={props.className}>
      <p>Player Scene</p>
      {props.children}
    </StyledPlayerScene>
  )
}

const StyledPlayerScene = styled.div`
  width: 100%;
  background-color: tomato;
`

export default PlayerScene
