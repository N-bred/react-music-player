import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        --primary: #4deeea;
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        font-family: sans-serif;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;

        &:focus, &:active {
            outline:none;
        }

        
    }

    @media only screen and (max-width: 400px) {
        html {
            font-size: 55%;
        }
    }

`
export default GlobalStyles
