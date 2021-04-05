import React, { createContext, useReducer, useContext, useState } from 'react'
import API from '../API/api'
import { MUSIC_LIST_ACTIONS, MUSIC_LIST_REDUCER } from './reducers/musicList.reducer'
import useLocalStorage from '../hooks/useLocalStorage'

const MusicListContext = createContext()

function MusicListProvider({ children }) {
  const [currentSong, setCurrentSong] = useLocalStorage('currentSong', 0, (v) => (v < API.length ? v : 0))

  const [state, dispatch] = useReducer(MUSIC_LIST_REDUCER, {
    API,
    current: Number(currentSong),
    current_song: API[Number(currentSong)],
    isRepeating: false,
    isRandomized: false,
    originalApi: [...API],
    changed: false,
    _setCurrentSong: setCurrentSong,
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
