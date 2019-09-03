import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
   text-align: center;
   width: 100%;
   height: 2.5rem;
   border-radius: 5px;
   overflow: hidden;
   color: #fff;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 2;
   margin: 1rem 0;
   cursor: pointer;
   background: #222;

   ::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      transition: width linear 1000ms;
      height: 100%;
      background: var(--primary);
      z-index: 0;
      width: ${props => props.width}%;
      box-shadow: 0.5rem 1rem 4rem var(--primary);
   }
`;

const Text = styled.p`
   position: relative;
   z-index: 2;
`;

const secToMin = s => {
   return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
};

export const ProgressBar = ({ width, currentTime, duration }) => {
   return (
      <Bar width={width}>
         <Text>
            {secToMin(parseInt(currentTime))} /{' '}
            {secToMin(parseInt(duration || 0))}
         </Text>
      </Bar>
   );
};
