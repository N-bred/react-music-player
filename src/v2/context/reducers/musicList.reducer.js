import { RandomizeArray } from '../../utils/RandomizeArray'
const MUSIC_LIST_ACTIONS = {
  LOG: 'log',
  SET_CURRENT: 'set_current',
  SET_NEXT: 'set_next',
  SET_PREVIOUS: 'set_previous',
  SET_REPEAT: 'set_repeat',
  SET_RANDOM: 'set_random',
  ADD_SONG: 'add_song',
}

const SET_CURRENT = (state, action) => {
  const song = state.API[action.payload.id]
  state._setCurrentSong(action.payload.id)

  return {
    ...state,
    current: action.payload.id,
    current_song: song,
    changed: action.payload.changed,
  }
}

const SET_NEXT = (state, action) => {
  if (action.payload.repeating) return SET_CURRENT(state, { payload: { id: state.current, changed: !state.changed } })
  const nextIdx = state.current + 1
  let idx = 0

  if (nextIdx <= state.API.length - 1) {
    idx = nextIdx
  }

  return SET_CURRENT(state, {
    payload: {
      id: idx,
    },
  })
}

const SET_PREVIOUS = (state) => {
  const previousIdx = state.current - 1
  let idx = state.API.length - 1
  if (previousIdx >= 0) {
    idx = previousIdx
  }
  return SET_CURRENT(state, {
    payload: {
      id: idx,
    },
  })
}

const SET_REPEAT = (state) => ({ ...state, isRepeating: !state.isRepeating })

const SET_RANDOM = (state) => {
  if (state.isRandomized)
    return {
      ...state,
      API: [...state.originalApi],
      isRandomized: false,
      current: state.originalApi.findIndex((song) => song.id === state.current_song.id),
    }
  const random = RandomizeArray(state.API)
  return {
    ...state,
    API: random,
    isRandomized: true,
    current: random.findIndex((song) => song.id === state.current_song.id),
  }
}

const ADD_SONG = (state, action) => {
  const { value } = action
  value.id = state.API.length
  state.API.push(value)
  state.originalApi.push(value)
  return { ...state }
}

function MUSIC_LIST_REDUCER(state, action) {
  switch (action.type) {
    case MUSIC_LIST_ACTIONS.LOG:
      console.log(state)
      return state
    case MUSIC_LIST_ACTIONS.SET_CURRENT:
      return SET_CURRENT(state, action)
    case MUSIC_LIST_ACTIONS.SET_NEXT:
      return SET_NEXT(state, action)
    case MUSIC_LIST_ACTIONS.SET_PREVIOUS:
      return SET_PREVIOUS(state)
    case MUSIC_LIST_ACTIONS.SET_REPEAT:
      return SET_REPEAT(state)
    case MUSIC_LIST_ACTIONS.SET_RANDOM:
      return SET_RANDOM(state)
    case MUSIC_LIST_ACTIONS.ADD_SONG:
      return ADD_SONG(state, action)

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export { MUSIC_LIST_ACTIONS, MUSIC_LIST_REDUCER }
