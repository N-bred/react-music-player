import React from 'react';
import styled from 'styled-components';
import { SearchBar } from './sub-components/SearchBar';
import { MusicList } from './sub-components/MusicList';

const SidebarComp = styled.div`
   flex: 0 0 30%;
   height: 100%;
   background: rgba(0, 0, 0, 0.4);
   padding: 0 1.5rem;
   display: flex;
   align-items: center;
   flex-direction: column;
`;

const Title = styled.h1`
   font-size: 2rem;
   color: #fff;
   font-weight: lighter;
   text-align: center;
   padding: 1.5rem 0;
   text-transform: uppercase;
`;

export const Sidebar = () => {
   return (
      <SidebarComp>
         <Title>React Music Player</Title>

         <SearchBar />

         <MusicList />
      </SidebarComp>
   );
};
