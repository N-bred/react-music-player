import React from 'react'
import styled from 'styled-components'
import Search from '../../icons/Search'

function SearchInput() {
  return (
    <StyledSearchInput>
      <input type='text' placeholder='Search...' />
      <button>
        <Search />
      </button>
    </StyledSearchInput>
  )
}

const StyledSearchInput = styled.form`
  display: flex;
  height: 5rem;
  width: 100%;

  input[type='text'] {
    background: transparent;
    color: #fff;
    border: none;
    border-bottom: 2px solid #fff;
    flex-basis: 80%;
    padding: 1.5rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--primary);
    }
  }

  input[type='text']:focus {
    &,
    & + button {
      border-bottom-color: var(--primary);
    }
  }

  button {
    height: 100%;
    flex-basis: 20%;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #fff;
    padding: 1rem;
    cursor: pointer;
  }

  button svg {
    object-fit: cover;
    height: 100%;
    fill: var(--primary);
  }

  button:hover svg {
    stroke: #fff;
  }
`

export default SearchInput
