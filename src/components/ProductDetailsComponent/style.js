import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperImageSmall = styled(Image)`
    height:64px;
    width:64px;
`;

export const WrappertStyledColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`;

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 700;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`;

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    display: flex;
`;

export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

export const WrapperPriceDiscountProduct = styled.span`
    font-size: 16pxpx;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 15px;
    color: #ff0000;
`;

export const WrapperAddressproduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`;

export const WrapperQuanlityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 30px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none;
        }
    }
`;

export const WrapperDesProduct = styled.div`
    font-size: 16px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e5e5e5;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
