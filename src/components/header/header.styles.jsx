import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 30px 0;
`;

export const LogoContainer = styled(Link)`
  height: 100px;
  width: auto;

  .logo {
    height: 100%;
    width: auto;
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 2px solid rgba(0, 0, 0, 0);

  &:hover {
    border-bottom: 2px solid black;
  }
`;
