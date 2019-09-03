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
    currentSong: Api[3]
  };

  changeSong = id => {
    this.setState(() => ({ currentSong: Api[id] }));
  };

  render() {
    const { currentSong } = this.state;
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
          <MediaOptions />
        </MediaPlayer>
      </AppContainer>
    );
  }
}

export default App;
