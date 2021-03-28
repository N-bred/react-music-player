import React from 'react'
import styled from 'styled-components'

function MusicList(props) {
  return (
    <StyledMusicList>
      <h2>Available Songs</h2>

      <ul>
        {props.list.map((el) => (
          <li key={el.title}>
            <a href={el.url}>
              {el.title} - {el.song}
            </a>
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

      a {
        color: rgba(255, 255, 255, 0.8);
        width: 100%;
        display: block;
        text-decoration: none;

        &:hover {
          color: var(--primary);
        }
      }
    }
  }
`

export default MusicList
