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

export default class App extends Component {
  state = {
    currentSong: Api[3],
    playing: false,
    audio: new Audio(`../Music/${Api[3].src}`),
    percentage: 0,
    random: false,
    repeat: false
  };

  componentDidMount() {
    this.setState(() => {
      const audio = new Audio(`../Music/${this.state.currentSong.src}`);
      return { audio };
    });

    document.addEventListener('keyup', e => {
      e.preventDefault();

      switch (e.code) {
        case 'Space':
          this.changePlay();
          break;
        case 'ArrowRight':
          this.handleNextSong();
          break;
        case 'ArrowLeft':
          this.handlePrevSong();
          break;
        default:
          break;
      }
    });

    setTimeout(() => {
      this.state.audio.addEventListener('ended', e => {
        this.handleAutoPlay();
      });
    }, 2000);
  }

  componentDidUpdate(p, st) {
    document.body.style.background = `url('../img/${this.state.currentSong.img}') #131313  no-repeat center`;
    document.body.style.backgroundSize = 'cover';
  }

  setRandom = () => {
    this.setState(oldSt => ({ random: !oldSt.random }));
  };

  setRepeat = () => {
    this.setState(oldSt => ({ repeat: !oldSt.repeat }));
  };

  setVolume = vol => {
    this.setState(oldSt => {
      const { audio } = oldSt;
      audio.volume = vol;

      return { audio };
    });
  };

  changeSong = id => {
    this.state.audio.pause();
    clearInterval(interval);

    this.setState(oldSt => {
      const { audio } = oldSt;
      audio.src = `../Music/${Api[id].src}`;

      return {
        currentSong: Api[id],
        playing: false,
        audio
      };
    });

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
    const songsLength = Api.length;
    if (id - 1 < 0) {
      this.changeSong(songsLength - 1);
    } else {
      this.changeSong(id - 1);
    }
  };

  handleNextSong = (repeat = false, random = false) => {
    const { id } = this.state.currentSong;
    const songsLength = Api.length;

    if (repeat) {
      this.changeSong(id);
    } else if (random) {
      const randomNum = parseInt(Math.random() * songsLength - 1);
      this.changeSong(randomNum);
    } else {
      if (id + 1 >= songsLength) {
        this.changeSong(0);
      } else {
        this.changeSong(id + 1);
      }
    }
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

  handleAutoPlay = () => {
    if (this.state.repeat) {
      this.handleNextSong(true);
    } else if (this.state.random) {
      this.handleNextSong(false, true);
    } else {
      this.handleNextSong();
    }
  };

  render() {
    const {
      currentSong,
      playing,
      percentage,
      audio,
      random,
      repeat
    } = this.state;

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
            audio={audio}
            changePlay={this.changePlay}
            durationPercent={percentage}
            currentTime={audio.currentTime}
            duration={audio.duration}
            handlePrevSong={this.handlePrevSong}
            handleNextSong={this.handleNextSong}
            handleClickProgress={this.handleClickProgress}
            setRandom={this.setRandom}
            setRepeat={this.setRepeat}
            random={random}
            repeat={repeat}
            setVolume={this.setVolume}
          />
        </MediaPlayer>
      </AppContainer>
    );
  }
}
