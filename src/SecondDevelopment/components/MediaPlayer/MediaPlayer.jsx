import React from 'react'
import styled from 'styled-components'
import { Play, Repeat, Pause, Random, Previous, Next, Volume } from '../../icons'
import ButtonSvg from '../ButtonSvg/ButtonSvg'
import ProgressBar from '../ProgressBar/ProgressBar'

function MediaPlayer(props) {
  return (
    <StyledMediaPlayer {...props}>
      <div className='controls'>
        <div className='controls-bar'>
          <ButtonSvg>
            <Random />
          </ButtonSvg>
          <ButtonSvg>
            <Previous />
          </ButtonSvg>
          <ButtonSvg>
            <Play />
          </ButtonSvg>
          <ButtonSvg rotate>
            <Previous />
          </ButtonSvg>
          <ButtonSvg>
            <Repeat />
          </ButtonSvg>
        </div>
        <ProgressBar />
      </div>
      <div className='volume'>
        <ButtonSvg>
          <Volume />
        </ButtonSvg>
      </div>
    </StyledMediaPlayer>
  )
}

const StyledMediaPlayer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 35rem calc(100% - 35rem - 25rem) 25rem;
  justify-content: center;
  align-items: center;

  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(46, 46, 46, 1) 40%,
    rgba(46, 46, 46, 1) 60%,
    rgba(0, 0, 0, 1) 100%
  );

  .controls {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .controls-bar {
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }

  .volume {
    grid-column: 3;
  }
`

export default MediaPlayer
