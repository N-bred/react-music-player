import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { Sidebar } from './Sidebar/Sidebar';
import { MediaMusic } from './MediaMusic/MediaMusic';
import { MediaOptions } from './MediaOptions/MediaOptions';

import Api from '../Api/api';

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
    audio: null
  };

  componentDidMount() {
    this.setState(() => ({
      audio: new Audio(`../Music/${this.state.currentSong.src}`)
    }));
  }

  changeSong = id => {
    this.state.audio.pause();

    this.setState(() => ({
      currentSong: Api[id],
      playing: false,
      audio: new Audio(`../Music/${Api[id].src}`)
    }));

    setTimeout(() => {
      this.setState(() => ({ playing: true }));
      this.state.audio.play();
    }, 100);
  };

  changePlay = () => {
    this.setState(() => ({ playing: !this.state.playing }));

    if (this.state.playing) {
      this.state.audio.pause();
    } else {
      this.state.audio.play();
    }
  };

  render() {
    const { currentSong, playing } = this.state;
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
          <MediaOptions playing={playing} changePlay={this.changePlay} />
        </MediaPlayer>
      </AppContainer>
    );
  }
}

export default App;
