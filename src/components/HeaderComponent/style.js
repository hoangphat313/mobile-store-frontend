import { Row, Col } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    height: 70px;
    align-items: center;
    background-color: #111111;
    padding: 0 20px;
    justify-content: space-evenly;

    @media (max-width: 768px) {
        padding: 0 10px;
    }
`;

export const WrapperTextHeader = styled.span`
    font-size: 25px;
    color: #fff;
    margin-left: 0;
    font-weight: bold;
    font-family: Arial, sans-serif;
    text-shadow: 2px 2px 4px #000000;
    transition: color 0.3s ease-in-out;

    &:hover {
        color: rgb(26, 148, 255);
    }

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const WrapperHeaderAccount = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const WrapperTextHeaderSmall = styled.span`
    font-size: 15px;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background-color: var(--primary-color);
        color: #7743DB;
        font-weight: 700;
        font-size: 18px;
        border-radius: 4px;
    }

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const WraperContextPupop = styled.p`
    cursor: pointer;

    &:hover {
        color: rgb(26, 148, 255);
    }
`;
