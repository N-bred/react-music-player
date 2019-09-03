import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import icons from '../../img/img.map';

import { ControlButton } from './sub-components/ControlButton';
import { ProgressBar } from './sub-components/ProgressBar';
const Options = styled.div`
  width: 100%;
  background: #333;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OptionsBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const ProgressContainer = styled.div`
  width: 100%;
`;

export const MediaOptions = () => {
  const [playing, setPlaying] = useState(true);
  const [progress, setP] = useState(0);

  let num = progress;

  useEffect(() => {
    setInterval(() => {
      setP(num++);
    }, 1000);
  }, []);

  console.log(progress);

  const handle = () => {
    setPlaying(!playing);
  };

  return (
    <Options>
      <Container>
        <OptionsBar>
          <ControlButton img={icons[0]} />
          <ControlButton img={icons[1]} />

          {playing ? (
            <ControlButton img={icons[3]} action={handle} />
          ) : (
            <ControlButton img={icons[2]} action={handle} />
          )}

          <ControlButton img={icons[4]} />
          <ControlButton img={icons[5]} />

          <ControlButton img={icons[6]} volume />
        </OptionsBar>
        <ProgressContainer>
          <ProgressBar width={progress} />
        </ProgressContainer>
      </Container>
    </Options>
  );
};
