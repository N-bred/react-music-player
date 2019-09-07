import React, { useState, memo, useEffect } from 'react';
import styled, { css } from 'styled-components';
import icons from '../../img/img.map';
import { SearchBar } from './sub-components/SearchBar';
import { MusicList } from './sub-components/MusicList';
import { ControlButton } from '../MediaOptions/sub-components/ControlButton';
import { Input } from './sub-components/Input';

const SidebarComp = styled.div`
  min-width: 35rem;
  max-width: 35rem;
  width: 35rem;
  height: 100%;
  background: transparent;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 10;
  overflow: hidden;

  ::after {
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
  ::before,
  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 900px) {
    ${props =>
      !props.showing &&
      css`
        transform: translateX(-100%);
      `}

    transition: transform .3s ease-in;
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  }

  @media screen and (max-width: 400px) {
    min-width: 23rem;
    max-width: 23rem;
    width: 23rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0.5rem 2rem var(--primary);
  font-weight: lighter;
  text-align: center;
  padding: 1.5rem 0;
  text-transform: uppercase;
  z-index: 10;
`;

const Button = styled.button`
  z-index: 10;
  color: var(--primary);
  font-weight: lighter;
  background: rgba(0, 0, 0, 0.4);
  margin: 1.5rem 0;
  display: block;
  cursor: pointer;
  border: 1px solid var(--primary);
  padding: 1rem 1.5rem;
  transition-property: background, opacity;
  transition: 0.3s ease-in;
  cursor: pointer;

  :hover {
    background: var(--primary);
    color: #000;
    opacity: 0.8;
  }

  :focus {
    outline: none;
  }

  ${props =>
    props.active &&
    css`
      background: var(--primary);
      color: #000;
    `}
`;

export const Sidebar = memo(({ songs, currentSong, changeSong, addSong }) => {
  const [songsNew, setSongsNew] = useState([]);

  useEffect(() => {
    setSongsNew(songs);
  }, [songs]);

  const [showingBar, setShowingBar] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (query = '') => {
    const oldSongs = [...songsNew];
    if (query === null) {
      setSongsNew(songs);
      return false;
    }

    const filtered = oldSongs.filter(
      song =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length) {
      setSongsNew(filtered);
    }
  };

  const handleShowBar = () => {
    setShowingBar(!showingBar);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const goBottomOfList = () => {
    const list = document.getElementById('musicList');
    setTimeout(() => {
      list.scrollTo(0, list.offsetHeight + 20);
    }, 100);
  };

  return (
    <SidebarComp showing={showingBar} id="sidebar">
      <ControlButton img={icons[7]} toggle={true} action={handleShowBar} />

      <Title>React Music Player</Title>

      <Button onClick={handleShowForm} active={showForm}>
        Upload Song!
      </Button>

      {showForm ? (
        <Input
          songs={songs}
          addSong={addSong}
          setShowForm={setShowForm}
          goBottomOfList={goBottomOfList}
        />
      ) : (
        <SearchBar handleSearch={handleSearch} />
      )}

      <MusicList
        songs={songsNew}
        changeSong={changeSong}
        currentSong={currentSong}
      />
    </SidebarComp>
  );
});
