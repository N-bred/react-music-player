import React, { Component } from 'react';
import styled from 'styled-components';

import { Sidebar } from './Sidebar/Sidebar';
import { MediaMusic } from './MediaMusic/MediaMusic';
import { MediaOptions } from './MediaOptions/MediaOptions';

const MediaView = styled.main`
   height: 85vh;
   width: 100%;
`;

const MediaPlayer = styled.div`
   height: 15vh;
   width: 100%;
`;

class App extends Component {
   render() {
      return (
         <>
            <MediaView className="d-flex">
               <Sidebar />
               <MediaMusic />
            </MediaView>
            <MediaPlayer>
               <MediaOptions />
            </MediaPlayer>
         </>
      );
   }
}

export default App;
