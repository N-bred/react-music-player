import React from 'react'
import styled from 'styled-components'

function ProgressBar() {
  return (
    <StyledProgressBar>
      <div className='left-time'>00:56</div>
      <div className='progress'>
        <span className='circle'></span>
        <div className='progress-bar'></div>
      </div>

      <div className='total-time'>04:24</div>
    </StyledProgressBar>
  )
}

const StyledProgressBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem;

  .left-time,
  .total-time {
    color: #fff;
  }

  .left-time {
    margin-right: 1.5rem;
  }

  .total-time {
    margin-left: 1.5rem;
  }

  .progress {
    width: 100%;
    height: 0.5rem;
    margin: 1rem 0;
    border-radius: 5px;
    position: relative;
    background-color: #444;
  }

  .progress-bar {
    width: 50%;
    background: #fff;
    height: 100%;
  }

  .circle {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    position: absolute;
    left: calc(50% - 0.5rem);
    bottom: calc(50% - 0.5rem);
    background: #fff;
    border: none;
  }
`

export default ProgressBar
