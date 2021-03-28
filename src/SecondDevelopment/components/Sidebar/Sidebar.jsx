import React from 'react'
import styled from 'styled-components'
function Sidebar(props) {
  return (
    <StyledSidebar>
      <p>Sidebar</p>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  width: 100%;
  background-color: aquamarine;
`

export default Sidebar
