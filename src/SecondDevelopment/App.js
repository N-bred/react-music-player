import React from 'react'
import Ui from './components/UI/Ui'
import Sidebar from './components/Sidebar/Sidebar'
import MediaPlayer from './components/MediaPlayer/MediaPlayer'
import PlayerScene from './components/PlayerScene/PlayerScene'
import PlayerCanvas from './components/PlayerCanvas/PlayerCanvas'
import { MusicListProvider } from './context/MusicList'
import { MediaPlayerProvider } from './context/MediaPlayer'

function App() {
  return (
    <div>
      <MusicListProvider>
        <MediaPlayerProvider>
          <Ui>
            <Sidebar className='sidebar' />
            <PlayerScene className='player-scene'>
              <PlayerCanvas />
            </PlayerScene>
            <MediaPlayer className='media-player' />
          </Ui>
        </MediaPlayerProvider>
      </MusicListProvider>
    </div>
  )
}

export default App
