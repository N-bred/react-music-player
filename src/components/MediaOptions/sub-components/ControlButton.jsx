import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Button = styled.button`
   width: 5rem;
   height: 5rem;
   padding: 1rem;
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
`;

export const ControlButton = ({ img }) => {
   const svg = useRef();

   useEffect(() => {
      svg.current.innerHTML += img;
   }, [img]);

   return (
      <Button>
         <div className="svg-button" ref={svg}></div>
      </Button>
   );
};
