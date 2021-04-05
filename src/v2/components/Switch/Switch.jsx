import React from 'react'
import MSwitch from '@material-ui/core/Switch'

const Switch = ({ onChange, text }) => {
  return (
    <>
      <h2>{text}</h2>
      <MSwitch
        onChange={onChange}
        defaultChecked
        color='default'
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
    </>
  )
}

export default Switch
