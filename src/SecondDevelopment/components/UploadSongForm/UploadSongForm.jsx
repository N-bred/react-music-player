import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import { ACTIONS, useMusicList } from '../../context/MusicList'

function UploadSongForm(props) {
  const musicList = useMusicList()
  const [name, setName] = useState('')
  const [artist, setArtist] = useState('')
  const [imgFile, setImgFile] = useState('')
  const [songFile, setSongFile] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)

  useEffect(() => {
    setBtnDisabled(!validateInputs())
  }, [name, artist, songFile])

  const handleImgInput = (e) => {
    const file = e.currentTarget.files[0]
    const fileType = file.type.split('/')
    if (fileType[0] !== 'image') {
      alert('Only images allowed')
      e.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', (e) => {
      setImgFile(e.target.result)
    })
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e) => {
    const file = e.currentTarget.files[0]
    const fileType = file.type.split('/')
    if (fileType[0] !== 'audio') {
      alert('Only audios allowed')
      e.target.value = ''
      return
    }
    setSongFile(file)
  }

  const validateInputs = () => {
    if (name === '') return false
    if (artist === '') return false
    if (songFile === '') return false
    return true
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!validateInputs()) return
    if (imgFile === '') setImgFile('https://picsum.photos/1920/1080')

    const newSong = {
      name,
      artist,
      src: URL.createObjectURL(songFile),
      img: imgFile,
    }

    musicList.dispatch({ type: ACTIONS.ADD_SONG, value: newSong })
    setBtnDisabled(true)
    props.handleInputShowing()
  }

  return (
    <StyledUploadSongForm onSubmit={handleFormSubmit}>
      <label htmlFor='songName'>Song Name: </label>
      <input type='text' id='songName' onChange={(e) => setName(e.target.value)} value={name} />
      <label htmlFor='artistName'>Artist Name: </label>
      <input type='text' id='artistName' onChange={(e) => setArtist(e.target.value)} value={artist} />
      <label htmlFor='fileImgSelector' className='label-button'>
        {imgFile === '' ? 'Select an image (Optional)' : 'Image Loaded!'}
      </label>
      <input type='file' id='fileImgSelector' accept='image/*' onChange={handleImgInput} />

      <label htmlFor='fileSongSelector' className='label-button'>
        {songFile === '' ? 'Select a song' : 'Song Loaded!'}
      </label>

      <input type='file' id='fileSongSelector' accept='audio/*' onChange={handleFileInput} />

      <Button type='submit' disabled={btnDisabled}>
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
