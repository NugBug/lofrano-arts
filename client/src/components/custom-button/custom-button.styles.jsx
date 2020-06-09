import styled, { css } from "styled-components";

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }

    &:active {
      transform: translateY(1px);
    }

    &:focus {
      outline: 0;
    }
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: black;
      color: white;
      border: 1px solid black;
    }

    &:active {
      transform: translateY(1px);
    }

    &:focus {
      outline: 0;
    }
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #2768d2;
      border: none;
    }

    &:active {
      transform: translateY(1px);
    }

    &:focus {
      outline: 0;
    }
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  } else if (props.inverted) {
    return invertedButtonStyles;
  } else {
    return buttonStyles;
  }
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;
