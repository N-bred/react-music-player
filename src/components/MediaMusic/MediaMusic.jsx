import React from 'react';
import styled from 'styled-components';

import { Canvas } from './sub-components/Canvas';

const MusicComp = styled.div`
   flex: 0 0 calc(100% - 30rem);
   height: 100%;
   display: flex;
   align-items: center;
`;

export const MediaMusic = () => {
   return (
      <MusicComp>
         <Canvas />
      </MusicComp>
   );
};
