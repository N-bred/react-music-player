import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'

function UploadSongForm() {
  return (
    <StyledUploadSongForm>
      <label htmlFor='songName'>Song Name: </label>
      <input type='text' id='songName' />
      <label htmlFor='artistName'>Artist Name: </label>
      <input type='text' id='artistName' />
      <label htmlFor='fileImgSelector' className='label-button'>
        Select an image (Optional)
      </label>
      <input type='file' id='fileImgSelector' accept='image/*' />

      <label htmlFor='fileSongSelector' className='label-button'>
        Select a song
      </label>

      <input type='file' id='fileSongSelector' accept='audio/*' />

      <Button type='submit' text>
        Upload Song
      </Button>
    </StyledUploadSongForm>
  )
}

const StyledUploadSongForm = styled.form`
  margin: 2.5rem 0;
  display: block;
  width: 100%;

  label {
    color: var(--primary);
    font-weight: lighter;
    margin: 1.5rem 0;
    display: block;
  }

  input[type='text'] {
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
  }

  .label-button {
    color: var(--primary);
    font-weight: lighter;
    margin: 1.5rem 0;
    display: block;
    cursor: pointer;
    border: 1px solid var(--primary);
    padding: 1rem 1.5rem;
  }

  input[type='file'] {
    display: none;
    color: #000;
  }
`

export default UploadSongForm
