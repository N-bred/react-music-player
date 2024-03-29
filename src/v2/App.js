import React from 'react'
import Ui from './components/UI/Ui'
import Sidebar from './components/Sidebar/Sidebar'
import MediaPlayer from './components/MediaPlayer/MediaPlayer'
import PlayerScene from './components/PlayerScene/PlayerScene'
import { MusicListProvider } from './context/MusicList.context'
import { MediaPlayerProvider } from './context/MediaPlayer.context'
import { MediaPlayerListControllerProvider } from './context/MediaPlayerListController'

function App() {
  return (
    <div>
      <MusicListProvider>
        <MediaPlayerProvider>
          <MediaPlayerListControllerProvider>
            <Ui>
              <Sidebar />
              <PlayerScene />
              <MediaPlayer />
            </Ui>
          </MediaPlayerListControllerProvider>
        </MediaPlayerProvider>
      </MusicListProvider>
    </div>
  )
}

export default App
