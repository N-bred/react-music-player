import React, { useRef, useEffect, useState, useCallback } from 'react'
import styled, { keyframes, css } from 'styled-components'
import CanvasLib from './CanvasLib'
import CanvasDrawVariants from './CanvasDrawVariants'
import SwitchContainer from '../SwitchContainer/SwitchContainer'
import { ChooseRandomArrayElement } from '../../utils/ChooseRandomArrayElement'
import { RandomizeArray } from '../../utils/RandomizeArray'
import { useMusicList } from '../../context/MusicList.context'
import { BAR_WIDTH, BARS, COLOR_SCHEME, LIMIT, LINE_WIDTH, RADIUS } from './CanvasConfig'

function PlayerCanvas({ bars }) {
  const musicList = useMusicList()
  const canvasRef = useRef(null)
  const parentRef = useRef(null)
  const requestRef = useRef(null)
  const canvasLib = useRef(null)
  const canvasDrawVariants = useRef(null)
  const [drawMode, setDrawMode] = useState('circle')
  const [colors, setColors] = useState({})

  const handleDrawMode = useCallback(() => {
    if (drawMode === 'bars') return setDrawMode('circle')
    if (drawMode === 'circle') return setDrawMode('bars')
  }, [drawMode])

  useEffect(() => {
    const { width, height } = parentRef.current.getBoundingClientRect()
    canvasLib.current = CanvasLib(canvasRef.current, { width, height })
    canvasDrawVariants.current = CanvasDrawVariants(canvasLib.current, { width, height }, (Math.PI * 2) / BARS)
    canvasLib.current.fixDpi()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleSetColors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicList.state.current_song.src, musicList.state.changed])

  const handleSetColors = () => {
    setColors({
      bars: ChooseRandomArrayElement(COLOR_SCHEME),
      circle: RandomizeArray(COLOR_SCHEME),
      mainCircle: ChooseRandomArrayElement(COLOR_SCHEME),
      limit: ChooseRandomArrayElement(LIMIT),
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const drawCanvas = () => {
    canvasLib.current.bg('#000')
    if (drawMode === 'bars') {
      canvasDrawVariants.current.drawBars(bars, BAR_WIDTH, colors.bars)
    } else {
      canvasDrawVariants.current.drawCircle(bars, RADIUS, colors.circle, LINE_WIDTH, colors.limit)
      canvasDrawVariants.current.drawMainCircle(RADIUS, colors.mainCircle, '#000')
    }
    requestRef.current = requestAnimationFrame(drawCanvas)
  }

  useEffect(() => {
    cancelAnimationFrame(requestRef.current)
    requestRef.current = requestAnimationFrame(drawCanvas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawMode, drawCanvas])

  return (
    <StyledPlayerCanvas ref={parentRef} mode={drawMode}>
      <SwitchContainer handleDrawMode={handleDrawMode} drawMode={drawMode} />
      <canvas ref={canvasRef} />
    </StyledPlayerCanvas>
  )
}

const rotate = keyframes`

  0% {
    transform: rotate(0deg) scale(.8);
  }

  50% {
    transform: rotate(180deg) scale(1);
  }
  100% {
    transform: rotate(360deg) scale(.8);
  }
 
`

const StyledPlayerCanvas = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  width: 90%;
  height: 80%;
  border-radius: 0.5rem;

  canvas {
    width: 100% !important;
    height: 100% !important;
    mix-blend-mode: screen;
    pointer-events: none;
    animation: ${(props) =>
      props.mode === 'circle'
        ? css`
            ${rotate} 15s linear infinite
          `
        : 'none'};
  }

  .switch-container {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1.5rem;
    h2 {
      font-size: 1.8rem;
      color: #fff;
      text-transform: uppercase;
      text-align: center;
    }
  }

  @media only screen and (max-width: 768px) {
    .switch-container {
      h2 {
        font-size: 1.4rem;
      }
    }
  }
`

export default PlayerCanvas
