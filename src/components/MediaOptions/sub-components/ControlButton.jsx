import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  width: 5rem;
  height: 5rem;
  padding: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;

  .svg-button {
    svg {
      width: 100%;
      height: 100%;
    }
    svg,
    svg path {
      fill: #fff !important;
    }

    :hover svg,
    :hover svg path {
      fill: var(--primary) !important;
    }
  }

  :focus {
    outline: none;
  }

  ${props =>
    props.volume &&
    css`
      position: absolute;
      right: -10%;
      top: 50%;
      transform: translateY(-50%);
    `}
`;

export const ControlButton = ({ img, volume, action }) => {
  const svg = useRef();

  useEffect(() => {
    svg.current.innerHTML = img;
  }, [img]);

  return (
    <Button volume={volume} onClick={action}>
      <div className="svg-button" ref={svg}></div>
    </Button>
  );
};
