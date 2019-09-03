import React, { Component } from 'react';
import styled from 'styled-components';

import { Sidebar } from './Sidebar/Sidebar';
import { MediaMusic } from './MediaMusic/MediaMusic';
import { MediaOptions } from './MediaOptions/MediaOptions';

const AppContainer = styled.div`
  background: url('https://picsum.photos/1920/1080');
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
  render() {
    return (
      <AppContainer>
        <MediaView>
          <Sidebar />
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
