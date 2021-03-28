import React from 'react'
import styled from 'styled-components'

function Ui(props) {
  return <GridUi>{props.children}</GridUi>
}

const GridUi = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 4fr 1fr;
`

export default Ui
