import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { CanvasFunctions } from './CanvasFunctions';

const CanvasContainer = styled.div`
   width: 90%;
   height: 50%;
   background: rgba(0, 0, 0, 0.6);
   margin: 0 auto;
   padding: 2.5rem;
`;

const CanvasStyled = styled.canvas`
   width: 100%;
   height: 100%;
`;

export const Canvas = ({ frequency }) => {
   const canvasRef = useRef();

   const color = getComputedStyle(document.documentElement).getPropertyValue(
      '--color'
   );

   useEffect(() => {
      const cLib = new CanvasFunctions(canvasRef.current);
      const { width, height } = canvasRef.current;

      const barWidth = Math.ceil(frequency.length / width);

      const renderBars = () => {
         cLib.clearRect(0, 0, width, height);
         cLib.setColor(color);

         frequency.forEach((bit, i) => {
            cLib.drawRect(barWidth * 2 * i, height, barWidth, -bit * 1.5);
         });

         requestAnimationFrame(renderBars);
      };

      renderBars();
   }, [color, frequency]);

   return (
      <CanvasContainer>
         <CanvasStyled ref={canvasRef} />
      </CanvasContainer>
   );
};
