import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f5f5f5;
        color: #333;
        line-height: 1.6;
    }

    button {
        cursor: pointer;
        background-color: #15ab92;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        transition: background-color 0.3s;

        &:hover {
            background-color: #00c6aa;
        }

        &:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
    }

    input,
    textarea {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        width: 100%;
        margin-bottom: 10px;

        &:focus {
            outline: none;
            border-color: #15ab92;
        }
    }

    h1,
    h2,
    h3 {
        margin-bottom: 20px;
        color: #2c3e50;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
`;

export default GlobalStyle;