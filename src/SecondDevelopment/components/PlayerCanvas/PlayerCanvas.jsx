import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useMediaPlayer } from '../../context/MediaPlayer.context'
import CanvasLib from './CanvasLib'
import CanvasDrawVariants from './CanvasDrawVariants'

const BAR_WIDTH = 1
const RADIUS = 50
const BARS = 360

function PlayerCanvas() {
  const { frequency, analyser } = useMediaPlayer()
  const canvasRef = useRef(null)
  const parentRef = useRef(null)
  const requestRef = useRef(null)
  const canvasLib = useRef(null)
  const canvasDrawVariants = useRef(null)

  useEffect(() => {
    const { width, height } = parentRef.current.getBoundingClientRect()
    canvasLib.current = CanvasLib(canvasRef.current, { width, height })
    canvasDrawVariants.current = CanvasDrawVariants(canvasLib.current, { width, height })
    canvasLib.current.fixDpi()
    requestRef.current = requestAnimationFrame(drawCanvas)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  const drawCanvas = () => {
    // canvasLib.current.clearRect(0, 0, 10000, 10000)
    canvasLib.current.bg('#000')

    // CALL Analyser
    analyser.getByteFrequencyData(frequency)

    // Draw Bars
    canvasDrawVariants.current.drawBars(frequency, BAR_WIDTH)
    // Draw Circle
    // canvasDrawVariants.current.drawMainCircle(RADIUS)
    //canvasDrawVariants.current.drawCircle(frequency, RADIUS, BARS)

    requestRef.current = requestAnimationFrame(drawCanvas)
  }

  return (
    <StyledPlayerCanvas ref={parentRef}>
      <canvas ref={canvasRef} />
    </StyledPlayerCanvas>
  )
}

const StyledPlayerCanvas = styled.div`
  width: 90%;
  background-color: rgba(0, 0, 0, 0.6);
  height: 80%;
  padding: 2rem;
  border-radius: 0.5rem;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`

export default PlayerCanvas
