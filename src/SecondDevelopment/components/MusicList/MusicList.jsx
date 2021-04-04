import React from 'react'
import styled from 'styled-components'
import MusicListItem from '../MusicListItem/MusicListItem'
import { useMediaPlayerListController } from '../../context/MediaPlayerListController'
function MusicList(props) {
  const { handleMusicListItemChange } = useMediaPlayerListController()

  return (
    <StyledMusicList>
      <h2>Available Songs</h2>
      <ul>
        {props.list.map((el, i) => (
          <li key={el.id}>
            <MusicListItem current={props.current.id === el.id} onClick={() => handleMusicListItemChange({ id: el.id })}>
              {el.artist} - {el.name}
            </MusicListItem>
          </li>
        ))}
      </ul>
    </StyledMusicList>
  )
}

const StyledMusicList = styled.div`
  margin: 5rem 0;

  h2 {
    color: #fff;
    border-bottom: 1px solid #fff;
    padding-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    overflow-y: scroll;
    margin-top: 2.5rem;
    max-height: 30rem;

    li {
      margin: 2rem 0;
      width: 100%;
    }
  }
`

export default MusicList
