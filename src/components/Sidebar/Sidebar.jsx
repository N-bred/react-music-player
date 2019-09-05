import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import icons from '../../img/img.map';
import { SearchBar } from './sub-components/SearchBar';
import { MusicList } from './sub-components/MusicList';
import { ControlButton } from '../MediaOptions/sub-components/ControlButton';

const SidebarComp = styled.div`
  min-width: 30rem;
  max-width: 30rem;
  width: 30rem;
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

export const Sidebar = ({ songs, currentSong, changeSong }) => {
  const [state, setState] = useState({
    songs
  });

  const [showing, setShowing] = useState(false);

  const handleSearch = (query = '') => {
    const oldSongs = [...state.songs];

    if (query === null) {
      setState({ songs });
      return false;
    }

    const filtered = oldSongs.filter(
      song =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length) {
      setState({ songs: filtered });
    }
  };

  const handleShow = () => {
    setShowing(!showing);
  };

  return (
    <SidebarComp showing={showing} id="sidebar">
      <ControlButton img={icons[7]} toggle={true} action={handleShow} />

      <Title>React Music Player</Title>

      <SearchBar handleSearch={handleSearch} />

      <MusicList
        songs={state.songs}
        changeSong={changeSong}
        currentSong={currentSong}
      />
    </SidebarComp>
  );
};
