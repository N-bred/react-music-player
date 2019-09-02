import React from 'react';
import styled from 'styled-components';
import icons from '../../img/img.map';

import { ControlButton } from './sub-components/ControlButton';

const Options = styled.div`
   width: 100%;
   background: #333;
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
   justify-content: center;
   align-items: center;
`;

const ProgressContainer = styled.div`
   width: 100%;
`;

export const MediaOptions = () => {
   return (
      <Options>
         <Container>
            <OptionsBar>
               {icons.map(icon => (
                  <ControlButton img={icon} />
               ))}
            </OptionsBar>
            <ProgressContainer>
               <div>Holiwwis 3</div>
            </ProgressContainer>
         </Container>
      </Options>
   );
};
