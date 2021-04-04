import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMediaPlayer } from '../../context/MediaPlayer.context'
import CanvasLib from './CanvasLib'
import CanvasDrawVariants from './CanvasDrawVariants'
import Switch from '../Switch/Switch'

const BAR_WIDTH = 1
const RADIUS = 50
const BARS = 360

function PlayerCanvas() {
  const { analyser, frequency } = useMediaPlayer()
  const canvasRef = useRef(null)
  const parentRef = useRef(null)
  const requestRef = useRef(null)
  const canvasLib = useRef(null)
  const canvasDrawVariants = useRef(null)
  const [drawMode, setDrawMode] = useState('circle')

  const handleDrawMode = () => {
    if (drawMode === 'bars') return setDrawMode('circle')
    if (drawMode === 'circle') return setDrawMode('bars')
  }

  useEffect(() => {
    const { width, height } = parentRef.current.getBoundingClientRect()
    canvasLib.current = CanvasLib(canvasRef.current, { width, height })
    canvasDrawVariants.current = CanvasDrawVariants(canvasLib.current, { width, height })
    canvasLib.current.fixDpi()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const drawCanvas = () => {
    canvasLib.current.bg('#000')
    canvasDrawVariants.current.drawBar(drawMode === 'bars')
    requestRef.current = requestAnimationFrame(drawCanvas)
  }

  useEffect(() => {
    cancelAnimationFrame(requestRef.current)
    requestRef.current = requestAnimationFrame(drawCanvas)
  }, [drawMode])

  // const drawCanvas = () => {
  //   canvasLib.current.bg('#000')

  //   // CALL Analyser
  //   analyser.getByteFrequencyData(frequency)
  //   canvasDrawVariants.current.drawBars(frequency, BAR_WIDTH)

  //   // if (drawMode === 'bars') {
  //   //   // Draw Bars
  //   //   canvasDrawVariants.current.drawBars(frequency, BAR_WIDTH)
  //   // } else {
  //   //   // Draw Circle
  //   //   canvasDrawVariants.current.drawMainCircle(RADIUS)
  //   //   canvasDrawVariants.current.drawCircle(frequency, RADIUS, BARS)
  //   // }
  //   requestRef.current = requestAnimationFrame(drawCanvas)
  // }

  return (
    <StyledPlayerCanvas ref={parentRef}>
      <div className='switch-container'>
        <Switch onChange={handleDrawMode} text={drawMode} />
      </div>

      <canvas ref={canvasRef} />
    </StyledPlayerCanvas>
  )
}

const StyledPlayerCanvas = styled.div`
  width: 90%;
  background-color: rgba(0, 0, 0, 0.6);
  height: 70%;
  padding: 2rem;
  border-radius: 0.5rem;
  position: relative;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .switch-container {
    position: absolute;
    top: -15%;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1.5rem;
    h2 {
      color: #fff;
      text-transform: uppercase;
    }
  }
`

export default PlayerCanvas
