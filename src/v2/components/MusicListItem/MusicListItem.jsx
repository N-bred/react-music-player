import React from 'react'
import styled from 'styled-components'

const MusicListItem = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

const StyledButton = styled.button`
  color: ${(props) => (props.current ? 'var(--primary)' : 'rgba(255, 255, 255, 0.8)')};
  width: 100%;
  display: block;
  text-decoration: none;
  text-align: left;

  &:hover {
    color: var(--primary);
  }
`

export default MusicListItem
