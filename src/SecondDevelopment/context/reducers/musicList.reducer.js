const MUSIC_LIST_ACTIONS = {
  LOG: 'log',
  SET_CURRENT: 'set_current',
  SET_NEXT: 'set_next',
  SET_PREVIOUS: 'set_previous',
  SET_REPEAT: 'set_repeat',
  SET_RANDOM: 'set_random',
  ADD_SONG: 'add_song',
}

const SET_CURRENT = (state, action) => ({
  ...state,
  current: action.payload.id,
  current_song: state.API.find((song) => song.id === action.payload.id),
})

const SET_CURRENT_INDEX = (state, id) => ({
  ...state,
  current: id,
  current_song: state.API[id],
})

const SET_NEXT = (state) => {
  if (state.isRepeating) return SET_CURRENT(state, { payload: { id: state.current } })
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
  if (state.isRandomized) return SET_CURRENT_INDEX({ ...state, API: [...state.originalApi], isRandomized: false }, 0)
  const random = [...state.API].sort(() => 0.5 - Math.random())
  return SET_CURRENT_INDEX({ ...state, isRandomized: true, API: random }, 0)
}

const ADD_SONG = (state, action) => {
  const { value } = action
  value.id = state.API.length
  state.API.push(value)
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
      return SET_NEXT(state)
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
