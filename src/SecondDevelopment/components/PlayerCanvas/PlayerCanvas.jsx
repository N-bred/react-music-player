import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useMediaPlayer } from '../../context/MediaPlayer'
import Sketch from 'react-p5'

function PlayerCanvas(props) {
  const {
    state: { frequency },
  } = useMediaPlayer()

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1, 1).parent(canvasParentRef)
  }

  const draw = (p5) => {
    p5.background(0)
  }
  return (
    <StyledPlayerCanvas>
      <Sketch setup={setup} draw={draw} />
    </StyledPlayerCanvas>
  )
}

const StyledPlayerCanvas = styled.div`
  width: 90%;
  background-color: rgba(0, 0, 0, 0.6);
  height: 60%;
  padding: 2rem;
  border-radius: 0.5rem;

  .react-p5 {
    width: 100%;
    height: 100%;

    canvas.p5Canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
`

export default PlayerCanvas
