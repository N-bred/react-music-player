import React from 'react'
import styled from 'styled-components'
import { Play, Repeat, Pause, Random, Previous } from '../../icons'
import ButtonSvg from '../ButtonSvg/ButtonSvg'
import ProgressBar from '../ProgressBar/ProgressBar'
import VolumeSlider from '../VolumeSlider/VolumeSlider'
import { ACTIONS as MusicListActions, useMusicList } from '../../context/MusicList'
import { ACTIONS as MediaPlayerActions, useMediaPlayer } from '../../context/MediaPlayer'
import { useMediaPlayerListController } from '../../context/MediaPlayerListController'

function MediaPlayer(props) {
  const musicList = useMusicList()
  const mediaPlayer = useMediaPlayer()
  const { handlePlayButton, handlePauseButton } = useMediaPlayerListController()

  return (
    <StyledMediaPlayer {...props}>
      <div className='controls'>
        <div className='controls-bar'>
          <ButtonSvg
            onClick={() => musicList.dispatch({ type: MusicListActions.SET_RANDOM })}
            isActive={musicList.state.isRandomized}
          >
            <Random />
          </ButtonSvg>
          <ButtonSvg onClick={() => musicList.dispatch({ type: MusicListActions.SET_PREVIOUS })}>
            <Previous />
          </ButtonSvg>

          {mediaPlayer.state.isPlaying ? (
            <ButtonSvg onClick={handlePauseButton}>
              <Pause />
            </ButtonSvg>
          ) : (
            <ButtonSvg onClick={handlePlayButton}>
              <Play />
            </ButtonSvg>
          )}

          <ButtonSvg rotate={true} onClick={() => musicList.dispatch({ type: MusicListActions.SET_NEXT })}>
            <Previous />
          </ButtonSvg>
          <ButtonSvg
            onClick={() => musicList.dispatch({ type: MusicListActions.SET_REPEAT })}
            isActive={musicList.state.isRepeating}
          >
            <Repeat />
          </ButtonSvg>
        </div>
        <ProgressBar />
      </div>
      <VolumeSlider className='volume'></VolumeSlider>
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

  @media only screen and (max-width: 768px) {
    grid-template-columns: 100%;

    .controls {
      grid-column: 1;
    }

    .volume {
      display: none;
    }
  }
`

export default MediaPlayer
