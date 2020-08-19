import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
  overflow-x: hidden;
  font-family: 'Cinzel Decorative', cursive;
  font-family: 'Martel', serif;
  padding: 0px 60px;
  margin: 0;
  background: #7b8f9d;
  
    @media screen and (max-width: 800px) {
      padding: 0 10px;
    }
  }

  a {
    text-decoration: none;
    color: black;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content-wrap{
    flex: 1;
  }

  .footer-container {
    display: absolute;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  }
`;
