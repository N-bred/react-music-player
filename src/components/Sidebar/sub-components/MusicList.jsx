import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
   margin: 4rem 0;
   width: 100%;
   z-index: 10;
`;

const Title = styled.h2`
   color: #fff;
   font-weight: lighter;
   font-size: 1.6rem;
   padding-bottom: 1rem;
   border-bottom: 1px solid rgba(255, 255, 255, 0.6);
`;

const List = styled.ul`
   width: 100%;
   list-style: none;
   margin-top: 2.5rem;
   height: 19rem;
   overflow-y: overlay;

   ::-webkit-scrollbar {
      background: rgba(0, 0, 0, 0.6);
   }

   ::-webkit-scrollbar-thumb {
      background: var(--primary);
      width: 1rem;
   }
`;

const Option = styled.a`
   text-decoration: none;
   color: rgba(255, 255, 255, 0.8);
   display: block;
   width: 100%;
   padding: 1rem 0;

   ${props =>
      props.active &&
      css`
         color: var(--primary);
      `}

   :hover {
      color: var(--primary);
   }
`;

export const MusicList = ({ songs, changeSong, currentSong }) => {
   const handleChange = e => {
      e.preventDefault();
      e.stopPropagation();
      changeSong(e.target.id);
   };

   const setActiveClass = id => {
      const active = currentSong.id === id;
      return active ? true : false;
   };

   return (
      <Container>
         <Title>Available Songs</Title>

         <List>
            <li>
               {songs.map(song => (
                  <Option
                     active={setActiveClass(song.id)}
                     onClick={handleChange}
                     id={song.id}
                     key={song.id}
                     href="#"
                     changeSong={changeSong}
                  >{`${song.artist} - ${song.name}`}</Option>
               ))}
            </li>
         </List>
      </Container>
   );
};
