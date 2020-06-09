import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const CartIconContainer = styled.div`
  padding-bottom: 5px;
`;

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
  cursor: pointer;
  padding: 5px 10px;
  width: 100px;
  position: relative;
  text-align: center;
  text-decoration: none;
  -webkit-backface-visibility: hidden;
  -webkit-tap-highlight-color: transparent;

  &:before {
    position: absolute;
    opacity: 0;
    width: 0%;
    height: 2px;
    content: "";
    background: black;
    transition: all 0.3s;
    left: 0px;
    top: 0px;
  }

  &:after {
    position: absolute;
    opacity: 0;
    width: 0%;
    height: 2px;
    content: "";
    background: black;
    transition: all 0.3s;
    right: 0px;
    bottom: 0px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:before {
      opacity: 1;
      width: 100%;
    }

    &:hover:after {
      opacity: 1;
      width: 100%;
    }
  }

  &.selected:before {
    position: absolute;
    opacity: 1;
    width: 100%;
    height: 2px;
    content: "";
    background: black;
    transition: all 0.3s;
    right: 0px;
    bottom: 0px;
    left: 0px;
    top: 0px;
  }

  &.selected:after {
    position: absolute;
    opacity: 1;
    width: 100%;
    height: 2px;
    content: "";
    background: black;
    transition: all 0.3s;
    right: 0px;
    bottom: 0px;
  }

  @media screen and (max-width: 800px) {
    font-size: 12px;
    width: unset;
    flex: 0 25%;
    padding: unset;
    padding-top: 5px;
  }
`;
