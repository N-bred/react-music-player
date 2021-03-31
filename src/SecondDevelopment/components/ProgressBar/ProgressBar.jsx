import React, { useRef } from 'react'
import styled from 'styled-components'
import { ACTIONS, useMediaPlayer } from '../../context/MediaPlayer'

const secToMin = (s) => {
  if (Number.isNaN(s)) return false
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
}

function ProgressBar() {
  const mediaPlayer = useMediaPlayer()
  const barRef = useRef()
  const percentage = parseInt((mediaPlayer.state.currentTime / mediaPlayer.state.audio.duration) * 100) || 0

  const handleClick = (e) => {
    const position = e.clientX - barRef.current.getBoundingClientRect().x
    const percentPosition = parseInt((position * 100) / barRef.current.getBoundingClientRect().width)
    const seconds = parseInt((percentPosition * mediaPlayer.state.audio.duration) / 100)
    mediaPlayer.dispatch({ type: ACTIONS.SET_CURRENT_TIME, payload: { seconds } })
  }

  return (
    <StyledProgressBar width={percentage || 0}>
      <div className='left-time'>{secToMin(parseInt(mediaPlayer.state.currentTime))}</div>
      <div className='progress' ref={barRef} onClick={handleClick}>
        <span className='circle'></span>
        <div className='progress-bar'></div>
      </div>

      <div className='total-time'>{secToMin(parseInt(mediaPlayer.state.audio.duration)) || '00:00'}</div>
    </StyledProgressBar>
  )
}

const StyledProgressBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem;
  cursor: pointer;

  .left-time,
  .total-time {
    color: #fff;
  }

  .left-time {
    margin-right: 1.5rem;
  }

  .total-time {
    margin-left: 1.5rem;
  }

  .progress {
    width: 100%;
    height: 0.5rem;
    margin: 1rem 0;
    border-radius: 5px;
    position: relative;
    background-color: #444;
  }

  .progress-bar {
    width: ${(props) => props.width}%;
    background: #fff;
    height: 100%;
  }

  .circle {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    position: absolute;
    left: calc(${(props) => props.width}% - 0.5rem);
    bottom: calc(50% - 0.5rem);
    background: #fff;
    border: none;
  }
`

export default ProgressBar
