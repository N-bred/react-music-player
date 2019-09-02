import React from 'react';
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

   ::before {
      background: url('https://picsum.photos/1920/1080');
      filter: blur(5px);
      -webkit-filter: blur(5px);
      z-index: 0;
   }
   ::after {
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
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

export const Sidebar = () => {
   return (
      <SidebarComp>
         <Title>React Music Player</Title>

         <SearchBar />

         <MusicList />
      </SidebarComp>
   );
};
