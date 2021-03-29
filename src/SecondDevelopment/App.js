import React from 'react'
import Ui from './components/UI/Ui'
import Sidebar from './components/Sidebar/Sidebar'
import MediaPlayer from './components/MediaPlayer/MediaPlayer'
import PlayerScene from './components/PlayerScene/PlayerScene'
import PlayerCanvas from './components/PlayerCanvas/PlayerCanvas'
import { MusicListProvider } from './context/MusicList'

function App() {
  return (
    <div>
      <MusicListProvider>
        <Ui>
          <Sidebar className='sidebar' />
          <PlayerScene className='player-scene'>
            <PlayerCanvas />
          </PlayerScene>
          <MediaPlayer className='media-player' />
        </Ui>
      </MusicListProvider>
    </div>
  )
}

export default App
