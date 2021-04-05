import React, { memo } from 'react'
import Switch from '../Switch/Switch'

const SwitchContainer = memo(({ handleDrawMode, drawMode }) => {
  return (
    <div className='switch-container'>
      <Switch onChange={handleDrawMode} text={drawMode} />
    </div>
  )
})
export default SwitchContainer
