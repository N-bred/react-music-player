import React from 'react';
import styled from 'styled-components';
import icons from '../../img/img.map';

import { ControlButton } from './sub-components/ControlButton';
import { ProgressBar } from './sub-components/ProgressBar';
const Options = styled.div`
   width: 100%;
   background: #131313;
   height: 100%;
`;

const Container = styled.div`
   width: 100%;
   max-width: 120rem;
   margin: 0 auto;
   display: flex;
   height: 100%;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const OptionsBar = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-around;
   align-items: center;
   position: relative;
`;

const ProgressContainer = styled.div`
   width: 100%;
`;

export const MediaOptions = ({
   playing,
   changePlay,
   durationPercent,
   currentTime,
   duration,
   handlePrevSong,
   handleNextSong
}) => {
   return (
      <Options>
         <Container>
            <OptionsBar>
               <ControlButton img={icons[0]} />
               <ControlButton img={icons[1]} action={handlePrevSong} />

               {playing ? (
                  <ControlButton img={icons[3]} action={changePlay} />
               ) : (
                  <ControlButton img={icons[2]} action={changePlay} />
               )}

               <ControlButton img={icons[4]} action={handleNextSong} />
               <ControlButton img={icons[5]} />

               <ControlButton img={icons[6]} volume />
            </OptionsBar>
            <ProgressContainer>
               <ProgressBar
                  width={durationPercent}
                  currentTime={currentTime}
                  duration={duration}
               />
            </ProgressContainer>
         </Container>
      </Options>
   );
};
