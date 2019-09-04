import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  width: 5rem;
  height: 5rem;
  padding: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 5;

  .svg-button {
    svg {
      width: 100%;
      height: 100%;
    }
    svg,
    svg path {
      fill: #fff !important;
    }
  }

  :hover .svg-button svg,
  :hover .svg-button svg path {
    fill: var(--primary) !important;
  }

  :focus {
    outline: none;
  }
  ${props =>
    props.active &&
    css`
      .svg-button svg,
      .svg-button svg path {
        fill: var(--primary) !important;
      }
    `}

  ${props =>
    props.volume &&
    css`
      position: absolute;
      right: -10%;
      top: 50%;
      transform: translateY(-50%);
    `}

    .rangeslider__fill {
    background: var(--primary) !important;
  }
`;

export const ControlButton = ({ img, volume, action, active, children }) => {
  const svg = useRef();

  useEffect(() => {
    svg.current.innerHTML = img;
  }, [img]);

  return (
    <Button volume={volume} onClick={action} active={active}>
      <div className="svg-button" ref={svg}></div>

      {children && children}
    </Button>
  );
};
