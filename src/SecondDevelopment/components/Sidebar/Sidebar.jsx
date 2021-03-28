import React, { useState } from 'react'
import styled from 'styled-components'
function Sidebar(props) {
  const [isShowing, setIsShowing] = useState(false)

  const handleButtonClick = () => {
    setIsShowing(!isShowing)
  }

  return (
    <StyledSidebar {...props} isShowing={isShowing}>
      <button className='change-button' onClick={handleButtonClick}>
        Bar
      </button>
      <p>Sidebar</p>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  width: 100%;
  background-color: aquamarine;
  position: relative;

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

    &:hover {
      opacity: 1;
      color: var(--primary);
    }
  }

  @media only screen and (max-width: 768px) {
    transform: ${(props) => (props.isShowing ? 'translate(0,0)' : 'translate(-100%,0)')};
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
