import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonSvg from '../ButtonSvg/ButtonSvg'
import Menu from '../../icons/Menu'
import SearchInput from '../SearchInput/SearchInput'

function Sidebar(props) {
  const [isShowing, setIsShowing] = useState(false)

  const handleButtonClick = () => {
    setIsShowing(!isShowing)
  }

  return (
    <StyledSidebar {...props} isShowing={isShowing}>
      <ButtonSvg className='change-button' onClick={handleButtonClick}>
        <Menu />
      </ButtonSvg>

      <SearchInput />
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: relative;
  padding: 2.5rem;

  .change-button {
    opacity: 0;
    pointer-events: none;
    width: 5rem;
    height: 5rem;
    transition: 0.3s opacity ease-in-out;
    background: #444;
    color: #fff;
    border-radius: 5px;
    position: absolute;
    cursor: pointer;
    top: 2.5rem;
    outline: none;
    border: none;
    padding: 1.5rem;

    &:hover {
      opacity: 1;
      color: var(--primary);
    }
  }

  @media only screen and (max-width: 768px) {
    transform: ${(props) => (props.isShowing ? 'translate(0,0)' : 'translate(-100%,0)')};
    border-right: rgba(0, 0, 0, 0.5) solid 1rem;
    .change-button {
      opacity: 0.7;
      pointer-events: all;
      right: -20%;
    }
  }

  @media only screen and (max-width: 400px) {
    .change-button {
      right: -25%;
    }
  }
`

export default Sidebar
