import React, { useReducer, createContext, useContext } from 'react'

const ACTIONS = {
  PLAY: 'set_playing',
  PAUSE: 'set_paused',
  SET_VOLUME: 'set_volume',
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PLAY:
      return { ...state, isPlaying: true }
    case ACTIONS.PAUSE:
      return { ...state, isPlaying: false }
    case ACTIONS.SET_VOLUME:
      return { ...state, volume: action.payload.volume }
  }
}

// Context Creation

const MediaPlayerContext = createContext()

function MediaPlayerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    isPlaying: false,
    volume: 0.5,
  })
  const value = { state, dispatch }

  return <MediaPlayerContext.Provider value={value}>{children}</MediaPlayerContext.Provider>
}

function useMediaPlayer() {
  const context = useContext(MediaPlayerContext)
  if (context === undefined) {
    throw new Error('useMediaPlayer must be use inside a MediaPlayerProvider')
  }
  return context
}

export { ACTIONS, MediaPlayerProvider, useMediaPlayer }
