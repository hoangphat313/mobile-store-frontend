import styled from "styled-components";

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 13px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address-info,
  .phone-info,
  .delivery-info,
  .delivery-fee,
  .payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-top: 8px;
  }
  .name-delivery {
    color: rgb(234, 133, 0);
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 8px;
    color: rgb(234, 133, 0);
  }
`;

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
`;

export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const WrapperStyleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  border-top: 3px solid #fff;
`;

export const WrapperProduct = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  border-bottom: 3px solid #fff;
`;

export const WrapperNameProduct = styled.div`
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  width: 670px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: right;
  }
`;

export const WrapperItemLabel = styled.div`
  width: 200px;
  font-size: 15px;
  font-weight: 700;
  &:last-child {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: right;
  }
`;

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;
