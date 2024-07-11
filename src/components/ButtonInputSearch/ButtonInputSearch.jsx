import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const ButtonInputSearch = (props) => {
    const {
        size, placeholder,
        width = "600px",
        bordered, backgroundColorInput = "#fff",
        backgroundColorButton = "rgb(15, 15, 15)",
        colorButton = "#fff"
    } = props

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InputComponent
                size={size}
                width={width}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput }}
                {...props}
            />

        </div>
    )
}
export default ButtonInputSearch