import React, { useRef, useEffect } from 'react';
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
  z-index: 5;
  margin: 1rem 0;
  cursor: pointer;
  background: #222;

  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transition: width linear 1000ms;
    height: 100%;
    background: var(--primary);
    z-index: 3;
    width: var(--width);
    box-shadow: 0.5rem 1rem 4rem var(--primary);
  }
`;

const ProgressText = styled.p`
  position: relative;
  z-index: 5;
  color: #fff;
  pointer-events: none;
  user-select: none;
  mix-blend-mode: difference;
`;

const secToMin = s => {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
};

export const ProgressBar = ({ currentTime, duration, handleClickProgress }) => {
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
    <Bar onClick={handleClick} ref={barRef} id="bar">
      <ProgressText>{`${secToMin(parseInt(currentTime))} / ${secToMin(
        parseInt(duration || 0)
      )} `}</ProgressText>
    </Bar>
  );
};
