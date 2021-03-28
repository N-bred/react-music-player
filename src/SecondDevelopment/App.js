import React from 'react'
import Ui from './components/UI/Ui'
import Sidebar from './components/Sidebar/Sidebar'
import MediaPlayer from './components/MediaPlayer/MediaPlayer'
import PlayerScene from './components/PlayerScene/PlayerScene'
import PlayerCanvas from './components/PlayerCanvas/PlayerCanvas'

function App() {
  return (
    <div>
      <Ui>
        <Sidebar className='sidebar' />
        <PlayerScene className='player-scene'>
          <PlayerCanvas />
        </PlayerScene>
        <MediaPlayer className='media-player' />
      </Ui>
    </div>
  )
}

export default App
