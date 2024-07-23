import React from "react";
import Slider from "react-slick";
import { Image } from "antd";
import { WrapperSliderStyle } from "./style";

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((image, index) => (
                <Image key={index} src={image} alt="slider" preview={false} height="auto" width="100%" />
            ))}
        </WrapperSliderStyle>
    );
};

export default SliderComponent;
