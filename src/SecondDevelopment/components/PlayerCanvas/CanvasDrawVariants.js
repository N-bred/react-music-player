const CanvasDrawVariants = (canvas, size) => {
  const drawMainCircle = (radius, fillStyle = 'black', strokeStyle = '#666', lineWidth = 5) => {
    const centerX = size.width / 2
    const centerY = size.height / 2
    canvas.drawCircle(centerX, centerY, radius, fillStyle, strokeStyle, lineWidth)
  }

  const drawLine = (opts, color = '#fff', barWidth = 1) => {
    const { i, bars, height, radius } = opts
    const centerX = size.width / 2
    const centerY = size.height / 2
    const lineWidth = barWidth
    const rads = (Math.PI * 2) / bars

    const x = centerX + Math.cos(rads * i) * (radius + lineWidth)
    const y = centerY + Math.sin(rads * i) * (radius + lineWidth)
    const endX = centerX + Math.cos(rads * i) * (radius + height)
    const endY = parseInt(centerY + Math.sin(rads * i) * (radius + height))

    canvas.drawLine(color, lineWidth, 'round', x, y, endX, endY)
  }

  const drawCircle = (frequency, radius, bars) => {
    frequency.slice(0).forEach((freq, i) => {
      drawLine({ i, bars, height: freq, radius })
    })
  }

  const drawBars = (frequency, barWidth) => {
    frequency.slice(0, parseInt(size.width / barWidth)).forEach((freq, i) => {
      canvas.rect('#ffffff', barWidth * i * 1, size.height, barWidth, -freq * 1.5)
      canvas.stroke('#000')
    })
  }

  return {
    drawMainCircle,
    drawLine,
    drawCircle,
    drawBars,
  }
}

export default CanvasDrawVariants
