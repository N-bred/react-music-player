import React, { useState } from 'react'
import styled from 'styled-components'
import { Mute, HighVolume } from '../../icons'
import ButtonSvg from '../ButtonSvg/ButtonSvg'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core'

function VolumeSlider(props) {
  const [value, setValue] = useState(30)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <StyledVolumeSlider className={props.className}>
      <div className='value'>{value}%</div>

      <div className='slider'>
        <ButtonSvg style={{ padding: '.5rem' }} className='mute'>
          <Mute />
        </ButtonSvg>

        <div className='slider-container'>
          <CustomSlider value={value} onChange={handleChange} aria-labelledby='continuous-slider' />
        </div>

        <ButtonSvg style={{ padding: '.5rem' }} className='high'>
          <HighVolume />
        </ButtonSvg>
      </div>
    </StyledVolumeSlider>
  )
}

const StyledVolumeSlider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;

  .mute {
    margin-right: 1rem;
  }

  .high {
    margin-left: 1rem;
  }

  .value {
    color: #fff;
    padding: 1rem;
  }

  .slider {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 0 1.5rem;
    align-items: center;
  }

  .slider-container {
    width: 100%;
  }
`

const CustomSlider = withStyles({
  root: {
    color: 'var(--primary)',
    height: 4,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider)

export default VolumeSlider
