import React from 'react';
import styled, { css } from 'styled-components';

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

  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transition: width linear 1000ms;
    height: 100%;
    background: var(--primary);
    z-index: 0;

    ${props =>
      props.width &&
      css`
        width: ${props.width}%;
      `}
  }
`;

const Text = styled.p`
  position: relative;
  z-index: 2;
`;

export const ProgressBar = ({ width }) => {
  return (
    <Bar width={width}>
      <Text>{width}%</Text>
    </Bar>
  );
};
