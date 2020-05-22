import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
  opacity: 0.5;
  background: #000;
  height: 100vh;
  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255,255,255,1);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  -moz-animation: spin 1s ease-in-out infinite;
  -o-animation: spin 1s ease-in-out infinite;
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg)
    }
  }
`;