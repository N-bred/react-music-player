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

      @media screen and (max-width: 1300px) {
        right: 0;
      }

      @media screen and (max-width: 700px) {
        top: -100%;
        right: 0;
      }
    `}


    .rangeslider__fill {
    background: var(--primary) !important;
  }

  ${props =>
    props.toggle &&
    css`
      position: absolute;
      top: 2%;
      right: -20%;
      background: rgba(0, 0, 0, 0.6);

      @media screen and (max-width: 400px) {
        right: -30%;
      }
    `}
`;

export const ControlButton = ({
  img,
  volume,
  action,
  active,
  children,
  toggle
}) => {
  const svg = useRef();

  useEffect(() => {
    svg.current.innerHTML = img;
  }, [img]);

  const handleAction = () => {
    action();
  };

  return (
    <Button
      volume={volume}
      onClick={handleAction}
      active={active}
      toggle={toggle}
    >
      <div className="svg-button" ref={svg}></div>

      {children && children}
    </Button>
  );
};
