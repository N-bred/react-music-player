import React, { useState } from 'react';
import styled from 'styled-components';
import icons from '../../img/img.map';

import { ControlButton } from './sub-components/ControlButton';
import { ProgressBar } from './sub-components/ProgressBar';
import { CustomSlider } from './sub-components/Slider';
const Options = styled.div`
  width: 100%;
  background: #131313;
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

  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;

const VolumeText = styled.p`
  color: #fff;
  margin: 1rem 0;

  @media screen and (max-width: 1100px) {
    margin: 0.5rem 0;
  }
`;

export const MediaOptions = ({
  playing,
  changePlay,
  currentTime,
  duration,
  handlePrevSong,
  handleNextSong,
  handleClickProgress,
  setRandom,
  setRepeat,
  random,
  repeat,
  setVolume,
  audio
}) => {
  const [showingAudio, setShowingAudio] = useState(false);

  const handleShowAudio = () => {
    setShowingAudio(!showingAudio);
  };
  return (
    <Options>
      <Container>
        <OptionsBar>
          <ControlButton img={icons[0]} action={setRandom} active={random} />
          <ControlButton img={icons[1]} action={handlePrevSong} />

          {playing ? (
            <ControlButton img={icons[3]} action={changePlay} />
          ) : (
            <ControlButton img={icons[2]} action={changePlay} />
          )}

          <ControlButton img={icons[4]} action={handleNextSong} />
          <ControlButton img={icons[5]} action={setRepeat} active={repeat} />

          <ControlButton img={icons[6]} volume action={handleShowAudio}>
            {showingAudio && (
              <CustomSlider setVolume={setVolume} volume={audio.volume} />
            )}
            <VolumeText>{audio.volume * 100}%</VolumeText>
          </ControlButton>
        </OptionsBar>
        <ProgressContainer>
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            handleClickProgress={handleClickProgress}
          />
        </ProgressContainer>
      </Container>
    </Options>
  );
};
