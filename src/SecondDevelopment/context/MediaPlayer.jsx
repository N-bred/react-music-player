import React, { useReducer, createContext, useContext } from 'react'

const ACTIONS = {
  PLAY: 'set_playing',
  PAUSE: 'set_paused',
  SET_VOLUME: 'set_volume',
  SET_SONG: 'set_song',
  ADD_CURRENT_TIME: 'add_current_time',
  SET_CURRENT_TIME: 'set_current_time',
  SET_ENDED: 'set_ended',
  SET_FREQUENCY: 'set_frequency',
}

function PLAY(state) {
  const newState = { ...state, started: true, ended: false }
  newState.audio.play()
  return newState
}

function PAUSE(state) {
  const newState = { ...state, ended: false }
  newState.audio.pause()
  return newState
}

function SET_VOLUME(state, action) {
  const newState = { ...state }
  newState.audio.volume = action.payload.volume
  return newState
}

function SET_SONG(state, action) {
  const newState = { ...state, ended: false }
  newState.audio.src = action.payload.src

  if (action.payload.playing) {
    newState.audio.play()
  }

  return { ...newState, started: true }
}

function ADD_CURRENT_TIME(state, action) {
  return { ...state, currentTime: action.payload.currentTime }
}

function SET_CURRENT_TIME(state, action) {
  const newState = { ...state }
  newState.audio.currentTime = action.payload.seconds
  return newState
}

function SET_ENDED(state) {
  return { ...state, ended: true }
}

function SET_FREQUENCY(state, action) {
  const { dataArray, analyser } = action.payload

  analyser.getByteFrequencyData(dataArray)
  return { ...state, frequency: dataArray }
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
    case ACTIONS.ADD_CURRENT_TIME:
      return ADD_CURRENT_TIME(state, action)
    case ACTIONS.SET_CURRENT_TIME:
      return SET_CURRENT_TIME(state, action)
    case ACTIONS.SET_ENDED:
      return SET_ENDED(state)
    case ACTIONS.SET_FREQUENCY:
      return SET_FREQUENCY(state, action)

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

// Context Creation

const MediaPlayerContext = createContext()

function MediaPlayerProvider({ children }) {
  const audio = new Audio()
  const audioCtx = new AudioContext()
  const analyser = audioCtx.createAnalyser()
  const source = audioCtx.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(audioCtx.destination)
  const dataArray = new Uint8Array(analyser.frequencyBinCount)

  const [state, dispatch] = useReducer(reducer, {
    audio,
    started: false,
    currentTime: 0,
    ended: false,
    frequency: null,
  })

  window.addEventListener('mousemove', () => {
    if (audioCtx.state !== 'running') {
      audioCtx.resume()
    }
  })

  audio.addEventListener('timeupdate', () => {
    dispatch({ type: ACTIONS.ADD_CURRENT_TIME, payload: { currentTime: audio.currentTime } })
    dispatch({ type: ACTIONS.SET_FREQUENCY, payload: { dataArray, analyser } })
  })

  audio.addEventListener('ended', () => {
    dispatch({ type: ACTIONS.SET_ENDED })
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
