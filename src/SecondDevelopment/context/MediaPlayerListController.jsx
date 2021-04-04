import React, { createContext, useContext } from 'react'
import { MUSIC_LIST_ACTIONS, useMusicList } from './MusicList.context'
import { MEDIA_PLAYER_ACTIONS, useMediaPlayer } from './MediaPlayer.context'

const MediaPlayerListController = createContext()

const MediaPlayerListControllerProvider = ({ children }) => {
  const musicList = useMusicList()
  const mediaPlayer = useMediaPlayer()

  const value = {
    handlePlayButton: () => mediaPlayer.dispatch({ type: MEDIA_PLAYER_ACTIONS.PLAY }),
    handlePauseButton: () => mediaPlayer.dispatch({ type: MEDIA_PLAYER_ACTIONS.PAUSE }),
    handleMusicListItemChange: (payload) => musicList.dispatch({ type: MUSIC_LIST_ACTIONS.SET_CURRENT, payload }),
    handleRandomizeButton: () => musicList.dispatch({ type: MUSIC_LIST_ACTIONS.SET_RANDOM }),
    handlePreviousButton: () => musicList.dispatch({ type: MUSIC_LIST_ACTIONS.SET_PREVIOUS }),
    handleNextButton: () => musicList.dispatch({ type: MUSIC_LIST_ACTIONS.SET_NEXT }),
    handleRepeatButton: () => musicList.dispatch({ type: MUSIC_LIST_ACTIONS.SET_REPEAT }),
  }

  return <MediaPlayerListController.Provider value={value}>{children}</MediaPlayerListController.Provider>
}

const useMediaPlayerListController = () => {
  const context = useContext(MediaPlayerListController)
  if (context === undefined) {
    throw new Error('useMediaPlayerListController must be use inside a MediaPlayerListController')
  }
  return context
}

export { MediaPlayerListControllerProvider, useMediaPlayerListController }
