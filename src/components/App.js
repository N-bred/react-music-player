import React, { Component } from 'react';
import styled from 'styled-components';

import { Sidebar } from './Sidebar/Sidebar';
import { MediaMusic } from './MediaMusic/MediaMusic';
import { MediaOptions } from './MediaOptions/MediaOptions';

import Api from '../Api/api';

let interval;

const AppContainer = styled.div`
   background: transparent;
   background-size: cover;
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

   componentDidUpdate(p, st) {
      document.body.style.background = `url('../img/${this.state.currentSong.img}') #131313  no-repeat center`;
      document.body.style.backgroundSize = 'cover';
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

   handlePrevSong = () => {
      const { id } = this.state.currentSong;
      this.changeSong(id - 1);
   };

   handleNextSong = () => {
      const { id } = this.state.currentSong;
      this.changeSong(id + 1);
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

   handleClickProgress = percent => {
      const seconds = parseInt((percent * this.state.audio.duration) / 100);

      this.setCurrentTime(seconds);
   };

   setCurrentTime = sec => {
      this.state.audio.pause();
      clearInterval(interval);

      this.setState(old => {
         const { audio } = old;
         audio.currentTime = sec;

         return { audio };
      });

      this.state.audio.play();
      this.handleProgress();
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
                  handlePrevSong={this.handlePrevSong}
                  handleNextSong={this.handleNextSong}
                  handleClickProgress={this.handleClickProgress}
               />
            </MediaPlayer>
         </AppContainer>
      );
   }
}

export default App;
