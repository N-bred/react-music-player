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
    currentSong: Api[localStorage.getItem('lastAudio')] || Api[1],
    playing: false,
    audio: new Audio(
      `../Music/${Api[localStorage.getItem('lastAudio')].src}` ||
        `../Music/${Api[1].src}`
    ),
    random: false,
    repeat: false,
    frequency: []
  };

  componentDidMount() {
    this.setState(() => {
      const audio = new Audio(`../Music/${this.state.currentSong.src}`);
      audio.volume = localStorage.getItem('volume') || 1;
      return { audio };
    });
    this.setCanvasColor();

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

      this.getFrequency();
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
    localStorage.setItem('volume', vol);
    this.setState(oldSt => {
      const { audio } = oldSt;
      audio.volume = vol;

      return { audio };
    });
  };

  changeSong = id => {
    this.state.audio.pause();
    clearInterval(interval);

    localStorage.setItem('lastAudio', id);

    this.setState(oldSt => {
      const { audio } = oldSt;
      audio.src = `../Music/${Api[id].src}`;

      return {
        currentSong: Api[id],
        playing: false,
        audio
      };
    });

    this.setCanvasColor();

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
      const width = parseInt((audio.currentTime * 100) / audio.duration);
      document.documentElement.style.setProperty('--width', `${width}%`);
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
      const width = parseInt((audio.currentTime * 100) / audio.duration);
      document.documentElement.style.setProperty('--width', `${width}%`);

      return { audio, playing: true };
    });

    this.state.audio.play();
    this.handleProgress();
  };

  handleAutoPlay = () => {
    this.setCanvasColor();
    if (this.state.repeat) {
      this.handleNextSong(true);
    } else if (this.state.random) {
      this.handleNextSong(false, true);
    } else {
      this.handleNextSong();
    }
  };

  setCanvasColor = () => {
    const randomColor = () => {
      const randomVal = parseInt(Math.random() * 360);
      return `hsl(${randomVal}, 60%, 60%)`;
    };

    document.documentElement.style.setProperty('--color', randomColor());
  };

  getFrequency = () => {
    const { audio } = this.state;
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animationData = () => {
      analyser.getByteFrequencyData(dataArray);
      this.setState({ frequency: dataArray });
      requestAnimationFrame(animationData);
    };

    animationData();
  };

  render() {
    const {
      currentSong,
      playing,
      audio,
      random,
      repeat,
      frequency
    } = this.state;

    return (
      <AppContainer url={`../img/${currentSong.img}`}>
        <MediaView>
          <Sidebar
            songs={Api}
            currentSong={currentSong}
            changeSong={this.changeSong}
          />
          <MediaMusic frequency={frequency} />
        </MediaView>
        <MediaPlayer>
          <MediaOptions
            playing={playing}
            audio={audio}
            changePlay={this.changePlay}
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
