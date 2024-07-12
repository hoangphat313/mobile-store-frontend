import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import styled from "styled-components";

const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        bordered,
        backgroundColorInput = "#fff",
        backgroundColorButton = "rgb(15, 15, 15)",
        colorButton = "#fff",
        ...restProps
    } = props;

    return (
        <Wrapper>
            <StyledInputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput }}
                {...restProps}
            />

        </Wrapper>
    );
};

export default ButtonInputSearch;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 8px;

    @media (max-width: 820px) {
        flex-direction: column;
        align-items: center;
    }
`;

const StyledInputComponent = styled(InputComponent)`
    flex: 1;
    min-width: 150px;
    max-width: 400px; 

    @media (max-width: 820px) {
        width: 100%;
        margin-bottom: 8px;
    }
`;

const StyledButtonComponent = styled(ButtonComponent)`
    @media (max-width: 820px) {
        width: 100%;
    }
`;
