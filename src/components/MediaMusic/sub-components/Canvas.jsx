import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { CanvasFunctions } from './CanvasFunctions';

const CanvasContainer = styled.div`
   width: 80%;
   height: 50%;
   background: rgba(0, 0, 0, 0.6);
   margin: 0 auto;
   padding: 2.5rem;
`;

const CanvasStyled = styled.canvas`
   width: 100%;
   height: 100%;
`;

export const Canvas = () => {
   const canvasRef = useRef();

   const color = getComputedStyle(document.documentElement).getPropertyValue(
      '--primary'
   );

   useEffect(() => {
      const cLib = new CanvasFunctions(canvasRef.current);
      const { width, height } = canvasRef.current;

      cLib.setColor(color);
      cLib.drawRect(0, height, 15, -36);
   }, [color]);

   return (
      <CanvasContainer>
         <CanvasStyled ref={canvasRef} />
      </CanvasContainer>
   );
};
