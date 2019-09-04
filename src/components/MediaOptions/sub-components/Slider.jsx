import React from 'react';
import 'react-rangeslider/lib/index.css';
import Slider from 'react-rangeslider';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -100%);
`;

export const CustomSlider = ({ setVolume, volume }) => {
  const handleChage = value => {
    setVolume(value.toFixed(1));
  };

  return (
    <SliderContainer>
      <div className="slider orientation-reversed">
        <div className="slider-group">
          <div className="slider-vertical">
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={volume}
              orientation="vertical"
              onChange={handleChage}
            />
          </div>
        </div>
      </div>
    </SliderContainer>
  );
};
