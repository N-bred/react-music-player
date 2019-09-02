import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   margin: 4rem 0;
   width: 100%;
`;

const Title = styled.h2`
   color: #fff;
   font-weight: lighter;
   font-size: 1.6rem;
   padding-bottom: 1rem;
   border-bottom: 1px solid rgba(255, 255, 255, 0.6);
`;

const List = styled.ul`
   width: 100%;
   list-style: none;
   margin-top: 2.5rem;
`;

const Option = styled.a`
   text-decoration: none;
   color: #fff;
   display: block;
   width: 100%;
   padding: 1rem 0;

   :hover {
      color: greenyellow;
   }
`;

export const MusicList = () => {
   return (
      <Container>
         <Title>Available Songs</Title>

         <List>
            <li>
               <Option href="#">Marilyn</Option>
            </li>
         </List>
      </Container>
   );
};
