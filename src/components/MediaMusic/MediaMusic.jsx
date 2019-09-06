import React from 'react';
import styled from 'styled-components';

import { Canvas } from './sub-components/Canvas';

const MusicComp = styled.div`
   flex: 0 0 calc(100% - 35rem);
   height: 100%;
   display: flex;
   align-items: center;

   @media screen and (max-width: 900px) {
      flex: 1 0 100%;
   }
`;

export const MediaMusic = ({ frequency }) => {
   return (
      <MusicComp>
         <Canvas frequency={frequency} />
      </MusicComp>
   );
};
