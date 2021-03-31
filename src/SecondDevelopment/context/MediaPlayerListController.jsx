import React, { createContext, useContext, useEffect } from 'react'
import { ACTIONS as MusicListActions, useMusicList } from './MusicList'
import { ACTIONS as MediaPlayerActions, useMediaPlayer } from './MediaPlayer'

const MediaPlayerListController = createContext()

function MediaPlayerListControllerProvider({ children }) {
  const musicList = useMusicList()
  const mediaPlayer = useMediaPlayer()

  useEffect(() => {
    mediaPlayer.dispatch({
      type: MediaPlayerActions.SET_SONG,
      payload: { src: process.env.PUBLIC_URL + musicList.state.current_song.src },
    })
  }, [musicList.state])

  const handlePlayButton = () => mediaPlayer.dispatch({ type: MediaPlayerActions.PLAY })
  const handlePauseButton = () => mediaPlayer.dispatch({ type: MediaPlayerActions.PAUSE })
  const handleMusicListItemChange = async (payload) => musicList.dispatch({ type: MusicListActions.SET_CURRENT, payload })

  const value = { handlePlayButton, handlePauseButton, handleMusicListItemChange }

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
