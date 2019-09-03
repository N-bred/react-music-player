import React, { useRef } from 'react';
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
   z-index: 4;
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
      z-index: 3;
      width: ${props => props.width}%;
      box-shadow: 0.5rem 1rem 4rem var(--primary);
   }

   ::after {
      content: '${props => props.text}';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);  
      color: #fff;
      width: 100%;
      z-index: 10;
   }
`;

const secToMin = s => {
   return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
};

export const ProgressBar = ({
   width,
   currentTime,
   duration,
   handleClickProgress
}) => {
   const barRef = useRef();
   const handleClick = e => {
      e.stopPropagation();
      if (e.target.id === 'bar') {
         const position = e.clientX - e.target.getBoundingClientRect().x;

         const barWidth = Number(
            getComputedStyle(barRef.current).width.replace('px', '')
         );

         const percentPosition = parseInt((position * 100) / barWidth);

         handleClickProgress(percentPosition);
      }
   };
   return (
      <Bar
         width={width}
         onClick={handleClick}
         ref={barRef}
         id="bar"
         text={`${secToMin(parseInt(currentTime))} / ${secToMin(
            parseInt(duration || 0)
         )} `}
      />
   );
};
