import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 30px 0;

  @media screen and (max-width: 800px) {
      margin-bottom: 0px;
      padding: 25px 0 0 0;
    }
`;

export const LogoContainer = styled(Link)`
  height: 100px;
  width: auto;

  .logo {
    height: 100%;
    width: auto;
  }

  @media screen and (max-width: 800px) {
      height: 30px;
      width: 30px;
      position: absolute;
      top: 10px;
      left: 10px;
    }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
      justify-content: center;
    }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 2px solid rgba(0, 0, 0, 0);

  &:hover {
    border-bottom: 2px solid black;
  }

  @media screen and (max-width: 800px) {
      font-size: 12px;
      padding: 10px;
    }
`;
