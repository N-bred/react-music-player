import React, { useState } from 'react';
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
`;

export const Input = () => {
   const [state, setState] = useState({
      songName: '',
      artistName: '',
      fileImgSelector: '',
      fileSongSelector: ''
   });

   const resetState = () => {
      setState({
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

      const reader = new FileReader();
      reader.addEventListener('load', e => {
         setState(oldSt => {
            return { ...oldSt, [id]: e.currentTarget.result };
         });
      });

      reader.readAsDataURL(file);
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

      console.log(state);

      resetState();
   };

   const checkState = Object.values(state).every((st, i) => {
      if (i === 2) return true;
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
};
