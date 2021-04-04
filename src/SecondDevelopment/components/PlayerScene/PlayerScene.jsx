import React from 'react'
import styled from 'styled-components'

function PlayerScene(props) {
  return <StyledPlayerScene className={props.className}>{props.children}</StyledPlayerScene>
}

const StyledPlayerScene = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default PlayerScene
