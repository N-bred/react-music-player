import React, { createContext, useReducer, useContext, useState, useEffect } from 'react'
import API from '../API/api'
import { MUSIC_LIST_ACTIONS, MUSIC_LIST_REDUCER } from './reducers/musicList.reducer'

const MusicListContext = createContext()

function MusicListProvider({ children }) {
  const [state, dispatch] = useReducer(MUSIC_LIST_REDUCER, {
    API,
    current: 0,
    current_song: API[0],
    isRepeating: false,
    isRandomized: false,
    originalApi: [...API],
    changed: false,
  })

  const [repeating, setRepeating] = useState(false)

  const value = { state, dispatch, repeat: { repeating, setRepeating } }

  return <MusicListContext.Provider value={value}>{children}</MusicListContext.Provider>
}

function useMusicList() {
  const context = useContext(MusicListContext)
  if (context === undefined) {
    throw new Error('useMusicList must be used within a MusicListProvider')
  }
  return context
}

export { MusicListProvider, useMusicList, MUSIC_LIST_ACTIONS }
