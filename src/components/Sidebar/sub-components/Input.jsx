import React, { useState, memo } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin: 0 1.5rem;
  display: block;
  width: 100%;
  z-index: 10;
`;

const Label = styled.label`
  color: var(--primary);
  font-weight: lighter;
  margin: 1.5rem 0;
  display: block;
`;

const LabelButton = styled.label`
  color: var(--primary);
  font-weight: lighter;
  margin: 1.5rem 0;
  display: block;
  cursor: pointer;
  border: 1px solid var(--primary);
  padding: 1rem 1.5rem;
`;

const InputFile = styled.input`
  display: none;
  color: #000;
`;

const InputEl = styled.input`
  color: #fff;
  display: block;
  border: 1px solid var(--primary);
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  font-family: sans-serif;

  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin: 1.5rem 0;
  width: 100%;
  display: block;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--primary);
  padding: 1rem 1.5rem;
  color: #fff;
  text-transform: uppercase;
  font-size: 1.3rem;
  transition-property: background, opacity;
  transition: 0.3s ease-in;
  cursor: pointer;

  :hover {
    background: var(--primary);
    color: #000;
    opacity: 0.8;
  }

  :focus {
    outline: none;
  }

  :disabled {
    background: #d4d4d4;
  }
`;

export const Input = memo(({ songs, addSong }) => {
  const [state, setState] = useState({
    id: null,
    songName: '',
    artistName: '',
    fileImgSelector: '',
    fileSongSelector: ''
  });

  const resetState = () => {
    setState({
      id: null,
      songName: '',
      artistName: '',
      fileImgSelector: '',
      fileSongSelector: ''
    });
  };

  const handleInputText = e => {
    const { value, id } = e.target;
    setState(oldSt => {
      return { ...oldSt, [id]: value };
    });
  };

  const handleInputFile = e => {
    const file = e.currentTarget.files[0];
    const { id } = e.target;

    const fileType = file.type.split('/');

    if (id === 'fileImgSelector' && fileType[0] !== 'image') {
      alert('Only images allowed');
      e.target.value = '';
      return 0;
    }

    if (id === 'fileSongSelector' && fileType[0] !== 'audio') {
      alert('Only audios allowed');
      e.target.value = '';
      return 0;
    }

    if (!state.fileImgSelector) {
      setState(oldSt => {
        return { ...oldSt, fileImgSelector: 'https://picsum.photos/1920/1080' };
      });
    }

    setState(oldSt => {
      return {
        ...oldSt,
        [id]: URL.createObjectURL(file),
        id: songs.length - 1 + 1
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!state.songName || !state.artistName) {
      alert('Please complete the fields');
      return 0;
    }

    if (!state.fileSongSelector) {
      alert('Please choose a song');
      return 0;
    }

    addSong({
      id: state.id,
      src: state.fileSongSelector,
      name: state.songName,
      artist: state.artistName,
      img: state.fileImgSelector
    });

    resetState();
  };

  const checkState = Object.values(state).every((st, i) => {
    if (i === 3 || i === 0) return true;
    return st;
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="songName">Song Name: </Label>
      <InputEl
        type="text"
        id="songName"
        onChange={handleInputText}
        value={state.songName}
      />
      <Label htmlFor="artistName">Artist Name: </Label>
      <InputEl
        type="text"
        id="artistName"
        onChange={handleInputText}
        value={state.artistName}
      />

      <LabelButton htmlFor="fileImgSelector">
        Select an image (Optional)
      </LabelButton>
      <InputFile
        type="file"
        id="fileImgSelector"
        onChange={handleInputFile}
        accept="image/*"
      />

      <LabelButton htmlFor="fileSongSelector">Select a song</LabelButton>
      <InputFile
        type="file"
        id="fileSongSelector"
        onChange={handleInputFile}
        accept="audio/*"
      />

      <Button disabled={!checkState} type="submit">
        Upload Song
      </Button>
    </Form>
  );
});
