import React from 'react'
import styled from 'styled-components'

function MediaPlayer(props) {
  return (
    <StyledMediaPlayer {...props}>
      <p>Media Player</p>
    </StyledMediaPlayer>
  )
}

const StyledMediaPlayer = styled.div`
  width: 100%;
  background-color: greenyellow;
`

export default MediaPlayer
