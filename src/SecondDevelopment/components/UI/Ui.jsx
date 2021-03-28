import React from 'react'
import styled from 'styled-components'

function Ui(props) {
  return <GridUi>{props.children}</GridUi>
}

const GridUi = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: minmax(35rem, auto) 1fr;
  grid-template-rows: 85vh 1fr;

  .sidebar {
    grid-column: 1;
    grid-row: 1;
  }

  .player-scene {
    grid-column: 2;
    grid-row: 1;
  }

  .media-player {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 85vh 1fr;

    .sidebar {
      transition: transform 0.3s ease-in-out;
      position: absolute;
      height: 85vh;
      width: 35rem;
    }
    .player-scene {
      grid-column: 1/-1;
      grid-row: 1;
    }
  }

  @media only screen and (max-width: 400px) {
    .sidebar {
      width: 25rem;
    }
  }
`

export default Ui
