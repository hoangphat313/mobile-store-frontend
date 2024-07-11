import { Row, Col } from "antd";
import styled from "styled-components";

export const FooterStyled = styled(Row)`
    margin-top: 50px;
    padding: 20px;
    background-color: #111111;
    border-top: 1px solid #e5e5e5;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const FooterTextStyled = styled(Col)`
    font-size: 13px;
    color: #fff;

    h2 {
        font-size: 18px;
        color: #fff;
        margin-bottom: 10px;
    }

    p {
        margin: 5px 0;
    }

    .footer_icon {
        margin-top: 10px;

        a {
            margin-right: 10px;
        }
    }
`;
