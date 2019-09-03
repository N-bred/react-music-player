import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchBar } from './sub-components/SearchBar';
import { MusicList } from './sub-components/MusicList';

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

   const handleSearch = (query = '') => {
      const oldSongs = [...state.songs];

      const filtered = oldSongs.filter(
         song => song.name.includes(query) || song.artist.includes(query)
      );

      if (filtered.length) {
         setState({ songs: filtered });
      } else {
         setState({ songs });
      }
   };
   return (
      <SidebarComp>
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
