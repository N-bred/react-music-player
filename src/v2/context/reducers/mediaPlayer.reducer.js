const MEDIA_PLAYER_ACTIONS = {
  PLAY: 'set_playing',
  PAUSE: 'set_paused',
  SET_VOLUME: 'set_volume',
  SET_SONG: 'set_song',
  ADD_CURRENT_TIME: 'add_current_time',
  SET_CURRENT_TIME: 'set_current_time',
  SET_ENDED: 'set_ended',
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
  newState._setVolume(action.payload.volume)
  return newState
}

function SET_SONG(state, action) {
  const newState = { ...state, ended: false }
  newState.audio.src = action.payload.src

  if (newState.started) {
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

function MEDIA_PLAYER_REDUCER(state, action) {
  switch (action.type) {
    case MEDIA_PLAYER_ACTIONS.PLAY:
      return PLAY(state, action)
    case MEDIA_PLAYER_ACTIONS.PAUSE:
      return PAUSE(state, action)
    case MEDIA_PLAYER_ACTIONS.SET_VOLUME:
      return SET_VOLUME(state, action)
    case MEDIA_PLAYER_ACTIONS.SET_SONG:
      return SET_SONG(state, action)
    case MEDIA_PLAYER_ACTIONS.ADD_CURRENT_TIME:
      return ADD_CURRENT_TIME(state, action)
    case MEDIA_PLAYER_ACTIONS.SET_CURRENT_TIME:
      return SET_CURRENT_TIME(state, action)
    case MEDIA_PLAYER_ACTIONS.SET_ENDED:
      return SET_ENDED(state)

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export { MEDIA_PLAYER_ACTIONS, MEDIA_PLAYER_REDUCER }
