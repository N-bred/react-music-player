import React, { createContext, useContext, useEffect, useState } from 'react'
import { ACTIONS as MusicListActions, useMusicList } from './MusicList'
import { ACTIONS as MediaPlayerActions, useMediaPlayer } from './MediaPlayer'

const MediaPlayerListController = createContext()

function MediaPlayerListControllerProvider({ children }) {
  const musicList = useMusicList()
  const mediaPlayer = useMediaPlayer()
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    mediaPlayer.dispatch({
      type: MediaPlayerActions.SET_SONG,
      payload: { src: process.env.PUBLIC_URL + musicList.state.current_song.src, playing },
    })
  }, [musicList.state, playing])

  const handlePlayButton = () => mediaPlayer.dispatch({ type: MediaPlayerActions.PLAY })
  const handlePauseButton = () => mediaPlayer.dispatch({ type: MediaPlayerActions.PAUSE })

  const handleMusicListItemChange = (payload) => {
    musicList.dispatch({ type: MusicListActions.SET_CURRENT, payload })
    setPlaying(true)
  }
  const handleRandomizeButton = () => {
    musicList.dispatch({ type: MusicListActions.SET_RANDOM })
    setPlaying(false)
  }
  const handlePreviousButton = () => {
    musicList.dispatch({ type: MusicListActions.SET_PREVIOUS })
    setPlaying(true)
  }
  const handleNextButton = () => {
    musicList.dispatch({ type: MusicListActions.SET_NEXT })
    setPlaying(true)
  }
  const handleRepeatButton = () => {
    musicList.dispatch({ type: MusicListActions.SET_REPEAT })
    setPlaying(false)
  }

  const value = {
    handlePlayButton,
    handlePauseButton,
    handleMusicListItemChange,
    handleRandomizeButton,
    handlePreviousButton,
    handleNextButton,
    handleRepeatButton,
  }

  return <MediaPlayerListController.Provider value={value}>{children}</MediaPlayerListController.Provider>
}

function useMediaPlayerListController() {
  const context = useContext(MediaPlayerListController)
  if (context === undefined) {
    throw new Error('useMediaPlayerListController must be use inside a MediaPlayerListController')
  }
  return context
}

export { MediaPlayerListControllerProvider, useMediaPlayerListController }
