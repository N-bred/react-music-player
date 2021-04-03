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

  const drawLine = (strokeStyle, lineWidth, lineCap, x, y, endX, endY) => {
    ctx.strokeStyle = strokeStyle
    ctx.lineWidth = lineWidth
    ctx.lineCap = lineCap
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(endX, endY)
    ctx.stroke()
  }

  const drawCircle = (centerX, centerY, radius, fillStyle, strokeStyle, lineWidth) => {
    ctx.save()
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = fillStyle
    ctx.fill()
    ctx.strokeStyle = strokeStyle
    ctx.lineWidth = lineWidth
    ctx.stroke()
    ctx.restore()
  }
  return {
    bg,
    rect,
    stroke,
    drawLine,
    drawCircle,
  }
}

const drawMainCircle = (cnv, size, radius) => {
  const centerX = size.width / 2
  const centerY = size.height / 2
  cnv.drawCircle(centerX, centerY, radius, 'black', '#666', 5)
}

const drawLine = (opts, size, cnv) => {
  const { i, bars, height, radius } = opts
  const centerX = size.width / 2
  const centerY = size.height / 2
  const lineWidth = 1
  const rads = (Math.PI * 2) / bars

  const x = centerX + Math.cos(rads * i) * (radius + lineWidth)
  const y = centerY + Math.sin(rads * i) * (radius + lineWidth)
  const endX = centerX + Math.cos(rads * i) * (radius + height)
  const endY = parseInt(centerY + Math.sin(rads * i) * (radius + height))

  cnv.drawLine('#fff', lineWidth, 'round', x, y, endX, endY)
}

const drawCircle = (cnv, frequency, size, radius, bars) => {
  frequency.slice(0).forEach((freq, i) => {
    const height = freq
    drawLine({ i, bars, height, radius }, size, cnv)
  })
}

const drawBars = (cnv, frequency, size) => {
  frequency.slice(0, parseInt(size.width / BAR_WIDTH)).forEach((freq, i) => {
    cnv.rect('#ffffff', BAR_WIDTH * i * 1, size.height, BAR_WIDTH, -freq * 1.5)
    cnv.stroke('#000')
  })
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

      // drawBars(cnv, mediaPlayer.frequency, size)
      // drawMainCircle(cnv, size, 50)
      drawCircle(cnv, mediaPlayer.frequency, size, 50, 360)

      requestAnimationFrame(() => {
        draw(cnv)
      })
    }
    if (ctxRef.current) {
      const ctx = ctxRef.current
      const cnv = canvas(ctx, size)

      draw(cnv)
    }
  }, [size, mediaPlayer.frequency])

  return (
    <StyledPlayerCanvas ref={parentRef}>
      <canvas ref={canvasRef} width={size.width} height={size.height} />
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
    width: 100%;
    height: 100%;
  }
`

export default PlayerCanvas
