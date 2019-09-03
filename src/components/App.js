import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { Sidebar } from './Sidebar/Sidebar';
import { MediaMusic } from './MediaMusic/MediaMusic';
import { MediaOptions } from './MediaOptions/MediaOptions';

import Api from '../Api/api';

let interval;

const AppContainer = styled.div`
  ${props =>
    props.url &&
    css`
      background: url('${props.url}') no-repeat center;
      background-size: cover;
    `}
`;

const MediaView = styled.main`
  height: 85vh;
  width: 100%;
  display: flex;
`;

const MediaPlayer = styled.div`
  height: 15vh;
  width: 100%;
`;

class App extends Component {
  state = {
    currentSong: Api[3],
    playing: false,
    audio: new Audio(`../Music/${Api[3].src}`),
    percentage: 0
  };

  componentDidMount() {
    this.setState(() => ({
      audio: new Audio(`../Music/${this.state.currentSong.src}`)
    }));
  }

  changeSong = id => {
    this.state.audio.pause();
    clearInterval(interval);

    this.setState(() => ({
      currentSong: Api[id],
      playing: false,
      audio: new Audio(`../Music/${Api[id].src}`)
    }));

    setTimeout(() => {
      this.state.audio.play();
      this.setState(() => ({ playing: true }));
      if (this.state.playing) {
        this.handleProgress();
      }
    }, 100);
  };

  changePlay = () => {
    this.setState(oldSt => {
      if (oldSt.playing) {
        this.state.audio.pause();
        clearInterval(interval);
      } else {
        this.state.audio.play();
        this.handleProgress();
      }

      return { playing: !oldSt.playing };
    });
  };

  handleProgress = () => {
    const { audio } = this.state;
    interval = setInterval(() => {
      this.setState(() => {
        return {
          percentage: parseInt((audio.currentTime * 100) / audio.duration)
        };
      });
    }, 1000);
  };

  render() {
    const { currentSong, playing, percentage, audio } = this.state;
    return (
      <AppContainer url={`../img/${currentSong.img}`}>
        <MediaView>
          <Sidebar
            songs={Api}
            currentSong={currentSong}
            changeSong={this.changeSong}
          />
          <MediaMusic />
        </MediaView>
        <MediaPlayer>
          <MediaOptions
            playing={playing}
            changePlay={this.changePlay}
            durationPercent={percentage}
            currentTime={audio.currentTime}
            duration={audio.duration}
          />
        </MediaPlayer>
      </AppContainer>
    );
  }
}

export default App;
