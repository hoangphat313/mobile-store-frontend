import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { MenuOutlined } from "@ant-design/icons";

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: #fff;
    background: #9255fd;
    span {
      color: #fff;
    }
  }
  width: 100%;
  color: #9255fd;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const Body = styled.div`
  width: 100%;
  background-color: #fff;
  position: relative;
`;

export const Header = styled.div`
  position: absolute;
  top: 0.5%;
  left: 1%;
  transform: translate(-50%, -50%);
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuIcon = styled(MenuOutlined)`
  margin-left: 25px;
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  margin-top: 15px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const WrapperTypeProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 5px;
  justify-content: space-evenly;
  padding: 10px; 
  background-color: #fff; 
  border: 1px solid #ccc; 
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  h1 {
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    padding: 45px 30px;
  }

  @media (max-width: 768px) {
    padding: 0 10px;

    h1 {
      font-size: 24px;
      padding: 30px 20px;
    }
  }
`;
