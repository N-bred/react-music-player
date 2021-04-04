import React, { createContext, useReducer, useContext } from 'react'
import { MEDIA_PLAYER_ACTIONS, MEDIA_PLAYER_REDUCER } from './reducers/mediaPlayer.reducer'

const MediaPlayerContext = createContext()

const getAudio = () => {
  const audio = new Audio()
  const audioCtx = new AudioContext()
  const analyser = audioCtx.createAnalyser()
  const source = audioCtx.createMediaElementSource(audio)
  audio.pause()
  source.connect(analyser)
  analyser.connect(audioCtx.destination)
  const frequency = new Uint8Array(analyser.frequencyBinCount)
  return { audio, analyser, frequency, audioCtx }
}

const MediaPlayerProvider = ({ children }) => {
  // Audio Initalization With AudioContext
  const { audio, analyser, frequency, audioCtx } = getAudio()

  const [state, dispatch] = useReducer(MEDIA_PLAYER_REDUCER, {
    audio,
    currentTime: 0,
    ended: false,
    started: false,
  })

  // RESUME CONTEXT EVENT

  window.addEventListener('mousedown', () => {
    if (audioCtx.state !== 'running') {
      audioCtx.resume()
    }
  })

  // EVENTS

  audio.addEventListener('timeupdate', () => {
    dispatch({ type: MEDIA_PLAYER_ACTIONS.ADD_CURRENT_TIME, payload: { currentTime: audio.currentTime } })
  })

  audio.addEventListener('ended', () => {
    dispatch({ type: MEDIA_PLAYER_ACTIONS.SET_ENDED })
  })

  const value = { state, dispatch, frequency, analyser }
  return <MediaPlayerContext.Provider value={value}>{children}</MediaPlayerContext.Provider>
}

const useMediaPlayer = () => {
  const context = useContext(MediaPlayerContext)
  if (context === undefined) {
    throw new Error('useMediaPlayer must be use inside a MediaPlayerProvider')
  }
  return context
}

export { MediaPlayerProvider, useMediaPlayer, MEDIA_PLAYER_ACTIONS }
