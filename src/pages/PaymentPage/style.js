import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`

export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 769px) {
    flex-direction: row;  
    justify-content: space-between;
  }
`;

export const WrapperLeft = styled.div`
  width: 910px;
  display: flex;
  flex-direction: column; 
  
  @media (max-width: 768px) {
    flex-direction: column; 
    width: 100%;  
  }
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%; 
    margin-left: 0;
  }
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
`

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start; 
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold;
`

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
`
