import React from 'react'
import styled from 'styled-components'

function PlayerCanvas(props) {
  return (
    <StyledPlayerCanvas>
      <canvas className='canvas' />
    </StyledPlayerCanvas>
  )
}

const StyledPlayerCanvas = styled.div`
  width: 90%;
  background-color: rgba(0, 0, 0, 0.6);
  height: 60%;
  padding: 2rem;
  border-radius: 0.5rem;

  .canvas {
    width: 100%;
    height: 100%;
  }
`

export default PlayerCanvas
