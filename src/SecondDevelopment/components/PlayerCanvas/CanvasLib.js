const CanvasLib = (canvas, size) => {
  const ctx = canvas.getContext('2d')

  const fixDpi = () => {
    const dpi = window.devicePixelRatio
    const style = {
      height: () => getComputedStyle(canvas).getPropertyValue('height').slice(0, -2),
      width: () => getComputedStyle(canvas).getPropertyValue('width').slice(0, -2),
    }

    canvas.setAttribute('width', style.width() * dpi)
    canvas.setAttribute('height', style.height() * dpi)
  }

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

  const clearRect = (x, y, ex, ey) => {
    ctx.clearRect(x, y, ex, ey)
  }
  return {
    fixDpi,
    bg,
    rect,
    stroke,
    drawLine,
    drawCircle,
    clearRect,
  }
}

export default CanvasLib
