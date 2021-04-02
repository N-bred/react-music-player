import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useMediaPlayer } from '../../context/MediaPlayer'
import Sketch from 'react-p5'

function PlayerCanvas(props) {
  const parentReft = useRef()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const {
    state: { frequency },
  } = useMediaPlayer()

  useLayoutEffect(() => {
    const { width, height } = parentReft.current.canvasParentRef.current.getBoundingClientRect()
    setSize({ width, height })
  }, [])

  const setup = (p5, canvasParentRef) => {
    const { width, height } = size
    p5.createCanvas(width, height).parent(canvasParentRef)
  }

  const draw = (p5) => {
    p5.background(0)
  }

  return (
    <StyledPlayerCanvas>
      <Sketch setup={setup} draw={draw} ref={parentReft} />
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
  }
`

export default PlayerCanvas
