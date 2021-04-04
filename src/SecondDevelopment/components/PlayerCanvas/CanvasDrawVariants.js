const CanvasDrawVariants = (canvas, size) => {
  const drawMainCircle = (radius, fillStyle = 'black', strokeStyle = '#000', lineWidth = 5) => {
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

  const drawCircle = (frequency, radius, bars, colors, barWidth, limit) => {
    let idx = 0
    frequency.forEach((freq, i) => {
      if (i >= limit * (1 + idx)) {
        idx++
      }
      drawLine({ i, bars, height: freq, radius }, colors[idx], barWidth)
    })
  }

  const drawBars = (frequency, barWidth, color) => {
    frequency.forEach((freq, i) => {
      canvas.rect(color, barWidth * i, size.height, barWidth, -freq * 1.5)
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
