import React, { useRef, useState, useEffect, createContext } from 'react'
import styled from 'styled-components'
import { useMediaPlayer, ACTIONS } from '../../context/MediaPlayer'

const BAR_WIDTH = 1

const canvas = (ctx, size) => {
  const bg = (color) => {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, size.width, size.height)
  }
  const rect = (color, x, y, w, h) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
  }

  const stroke = (color) => {
    ctx.strokeStyle = color
    ctx.stroke()
  }
  return {
    bg,
    rect,
    stroke,
  }
}

function PlayerCanvas(props) {
  const mediaPlayer = useMediaPlayer()

  const canvasRef = useRef()
  const parentRef = useRef()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const ctxRef = useRef()

  useEffect(() => {
    const { width, height } = parentRef.current.getBoundingClientRect()
    setSize({ width, height })
    ctxRef.current = canvasRef.current.getContext('2d')
  }, [parentRef, canvasRef])

  useEffect(() => {
    function draw(cnv) {
      cnv.bg('#000000')

      mediaPlayer.frequency.slice(0, parseInt(size.width / BAR_WIDTH)).forEach((freq, i) => {
        cnv.rect('#ffffff', BAR_WIDTH * i * 1, size.height, BAR_WIDTH, -freq * 1.5)
        cnv.stroke('#000')
      })

      requestAnimationFrame(() => {
        draw(cnv)
      })
    }
    if (ctxRef.current) {
      const ctx = ctxRef.current
      const cnv = canvas(ctx, size)
      draw(cnv)
    }
  }, [mediaPlayer.frequency])

  return (
    <StyledPlayerCanvas ref={parentRef}>
      <canvas ref={canvasRef} width={size.width} height={size.height} />
    </StyledPlayerCanvas>
  )
}

const StyledPlayerCanvas = styled.div`
  width: 90%;
  background-color: rgba(0, 0, 0, 0.6);
  height: 60%;
  padding: 2rem;
  border-radius: 0.5rem;

  canvas {
    width: 100%;
    height: 100%;
  }
`

export default PlayerCanvas
