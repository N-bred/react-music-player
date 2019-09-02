import React, { Component } from 'react';
import styled from 'styled-components';

import { Sidebar } from './Sidebar/Sidebar';
import { MediaMusic } from './MediaMusic/MediaMusic';
import { MediaOptions } from './MediaOptions/MediaOptions';

const MediaView = styled.main`
   height: 90vh;
   width: 100%;
   display: flex;
`;

const MediaPlayer = styled.div`
   height: 10vh;
   width: 100%;
`;

class App extends Component {
   render() {
      return (
         <>
            <MediaView>
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
