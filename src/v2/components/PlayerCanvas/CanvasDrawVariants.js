const CanvasDrawVariants = (canvas, size, rads) => {
  let mult = 1

  if (size.width <= 400) {
    mult = 0.5
  } else if (size.width <= 768) {
    mult = 0.8
  } else if (size.width <= 1270) {
    mult = 0.9
  }

  const centerX = size.width / 2
  const centerY = size.height / 2

  const drawMainCircle = (radius, fillStyle = 'black', strokeStyle = '#000', lineWidth = 8) => {
    canvas.drawCircle(centerX, centerY, radius, fillStyle, strokeStyle, lineWidth)
  }

  const drawLine = (opts, color = '#fff', barWidth = 1) => {
    const { i, height, radius } = opts
    const x = centerX + Math.cos(rads * i) * (radius + barWidth)
    const y = centerY + Math.sin(rads * i) * (radius + barWidth)
    const endX = centerX + Math.cos(rads * i) * (radius + height)
    const endY = parseInt(centerY + Math.sin(rads * i) * (radius + height))
    canvas.drawLine(color, barWidth, 'square', x, y, endX, endY)
  }

  const drawCircle = (frequency, radius, colors, barWidth, limit) => {
    let idx = 0
    frequency.forEach((freq, i) => {
      if (i >= limit * (1 + idx)) idx++
      drawLine({ i, height: freq * mult, radius }, colors[idx], barWidth)
    })
  }

  const drawBars = (frequency, barWidth, color) => {
    frequency.forEach((freq, i) => {
      canvas.rect(color, barWidth * i, size.height, barWidth, -freq * 2)
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
