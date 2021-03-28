import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonSvg from '../ButtonSvg/ButtonSvg'
import Menu from '../../icons/Menu'
import SearchInput from '../SearchInput/SearchInput'
import MusicList from '../MusicList/MusicList'
import Button from '../Button/Button'
import UploadSongForm from '../UploadSongForm/UploadSongForm'

const data = [
  { title: 'Musica', url: 'aha', song: 'Pepe' },
  { title: 'Musica', url: 'aha', song: 'Pepe' },
  { title: 'Musica', url: 'aha', song: 'Pepe' },
  { title: 'Musica', url: 'aha', song: 'Pepe' },
  { title: 'Musica', url: 'aha', song: 'Pepe' },
]

function Sidebar(props) {
  const [isShowing, setIsShowing] = useState(false)
  const [isInputShowing, setIsInputShowing] = useState(false)

  const handleShowButtonClick = () => {
    setIsShowing(!isShowing)
  }
  const handleInputButtonClick = () => {
    setIsInputShowing(!isInputShowing)
  }

  return (
    <StyledSidebar {...props} isShowing={isShowing}>
      <ButtonSvg className='change-button' onClick={handleShowButtonClick}>
        <Menu />
      </ButtonSvg>
      <h1>React Music Player</h1>
      <Button onClick={handleInputButtonClick}>Upload Song!</Button>

      {isInputShowing ? (
        <UploadSongForm />
      ) : (
        <div>
          <SearchInput />
          <MusicList list={data} />
        </div>
      )}
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: relative;
  padding: 2.5rem;

  h1 {
    color: #fff;
    font-size: 2rem;
    text-shadow: 0 0.5rem 2rem var(--primary);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .change-button {
    opacity: 0;
    pointer-events: none;
    width: 5rem;
    height: 5rem;
    transition: 0.3s opacity ease-in-out;
    background: #444;
    color: #fff;
    border-radius: 5px;
    position: absolute;
    cursor: pointer;
    top: 2.5rem;
    outline: none;
    border: none;
    padding: 1.5rem;

    &:hover {
      opacity: 1;
      color: var(--primary);
    }
  }

  @media only screen and (max-width: 768px) {
    transform: ${(props) => (props.isShowing ? 'translate(0,0)' : 'translate(-100%,0)')};
    border-right: rgba(0, 0, 0, 0.5) solid 1rem;
    .change-button {
      opacity: 0.7;
      pointer-events: all;
      right: -20%;
    }
  }

  @media only screen and (max-width: 400px) {
    .change-button {
      right: -25%;
    }
  }
`

export default Sidebar
