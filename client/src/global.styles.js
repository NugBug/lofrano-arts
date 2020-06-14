import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
  overflow-x: hidden;
  font-family: 'Cinzel Decorative', cursive;
  font-family: 'Martel', serif;
  padding: 0px 60px;
  margin: 0;
  background: #8e9eab;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
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
