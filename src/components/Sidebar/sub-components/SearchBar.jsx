import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
   display: flex;
   position: relative;
   width: 100%;
   height: 5rem;
   z-index: 10;
`;

const Input = styled.input`
   border: none;
   border-bottom: 1px solid #fff;
   height: 100%;
   flex: 0 0 100%;
   background: transparent;
   padding: 0 1.5rem;
   color: #fff;
   font-size: 1.5rem;

   ::placeholder {
      color: #fff;
   }

   :focus {
      outline: none;
      border-bottom-color: var(--primary);
   }

   :focus::placeholder {
      color: var(--primary);
   }
`;

const Svg = styled.svg`
   object-fit: cover;
   width: 100%;
   fill: var(--primary);
`;

const Button = styled.button`
   position: absolute;
   top: 50;
   right: 0;
   height: 100%;
   width: 5rem;
   padding: 1.5rem;
   border: none;
   background: transparent;
   cursor: pointer;

   :focus {
      outline: none;
   }
`;

export const SearchBar = () => {
   return (
      <Form>
         <Input type="text" placeholder="Search..."></Input>

         <Button>
            <Svg
               id="Capa_1"
               enable-background="new 0 0 551.13 551.13"
               viewBox="0 0 551.13 551.13"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path d="m551.13 526.776-186.785-186.785c30.506-36.023 49.003-82.523 49.003-133.317 0-113.967-92.708-206.674-206.674-206.674s-206.674 92.707-206.674 206.674 92.707 206.674 206.674 206.674c50.794 0 97.294-18.497 133.317-49.003l186.785 186.785s24.354-24.354 24.354-24.354zm-344.456-147.874c-94.961 0-172.228-77.267-172.228-172.228s77.267-172.228 172.228-172.228 172.228 77.267 172.228 172.228-77.267 172.228-172.228 172.228z" />
            </Svg>
         </Button>
      </Form>
   );
};
