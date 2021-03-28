import React from 'react'
import styled from 'styled-components'

function PlayerCanvas(props) {
  return (
    <StyledPlayerCanvas>
      <p>PlayerCanvas</p>
    </StyledPlayerCanvas>
  )
}

const StyledPlayerCanvas = styled.div`
  width: 100%;
  background-color: azure;
`

export default PlayerCanvas
