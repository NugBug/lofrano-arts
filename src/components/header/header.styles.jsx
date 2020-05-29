import styled from "styled-components";
import { NavLink } from "react-router-dom";

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

export const LogoContainer = styled(NavLink)`
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
      top: 15px;
      left: 15px;
    }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
      justify-content: space-evenly;
      padding-top: 15px;
    }
`;

export const OptionLink = styled(NavLink)`
  padding: 10px 15px;
  cursor: pointer;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 3px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: #83929e;
    }
  }
  
  &.selected {
    background: #677580;
    color: #f0f0f0;
  }

  @media screen and (max-width: 800px) {
      font-size: 12px;
      width: unset;
      flex: 0 25%;
    }
`;
