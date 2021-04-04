import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import PlayerCanvas from '../PlayerCanvas/PlayerCanvas'
import { useMediaPlayer } from '../../context/MediaPlayer.context'

function PlayerScene(props) {
  const { analyser, frequency } = useMediaPlayer()
  const [bars, setBars] = useState([])
  const requestRef = useRef(null)

  const request = () => {
    analyser.getByteFrequencyData(frequency)
    setBars(frequency)
    requestRef.current = requestAnimationFrame(request)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(request)
  }, [])

  return (
    <StyledPlayerScene className={props.className}>
      <PlayerCanvas bars={bars} />
    </StyledPlayerScene>
  )
}

const StyledPlayerScene = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default PlayerScene
