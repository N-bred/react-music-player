import React, { useReducer, createContext, useContext } from 'react'

const ACTIONS = {
  PLAY: 'set_playing',
  PAUSE: 'set_paused',
  SET_VOLUME: 'set_volume',
  SET_SONG: 'set_song',
}

function PLAY(state) {
  const newState = { ...state, isPlaying: true }
  newState.audio.play()
  return newState
}

function PAUSE(state) {
  const newState = { ...state, isPlaying: false }
  newState.audio.pause()
  return newState
}

function SET_VOLUME(state, action) {
  const newState = { ...state, volume: action.payload.volume }
  newState.audio.volume = newState.volume
  return newState
}

function SET_SONG(state, action) {
  const newState = { ...state }
  newState.audio.src = action.payload.src

  return newState
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PLAY:
      return PLAY(state, action)
    case ACTIONS.PAUSE:
      return PAUSE(state, action)
    case ACTIONS.SET_VOLUME:
      return SET_VOLUME(state, action)
    case ACTIONS.SET_SONG:
      return SET_SONG(state, action)
  }
}

// Context Creation

const MediaPlayerContext = createContext()

function MediaPlayerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    isPlaying: false,
    volume: 0.5,
    audio: new Audio(),
    started: false,
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
