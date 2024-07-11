import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    cursor: pointer;

    & .slick-arrow.slick-prev {
        left: 12px;
        top: 50%;
        z-index: 10;

        &::before {
            font-size: 25px;
            color: #fff;
        }
    }

    & .slick-arrow.slick-next {
        right: 28px;
        top: 50%;
        z-index: 10;

        &::before {
            font-size: 25px;
            color: #fff;
        }
    }

    & .slick-dots {
        z-index: 10;
        bottom: -2px !important;

        li {
            button {
                &::before {
                    color: rgba(255, 255, 255, 0.5);
                }
            }

            &.slick-active {
                button {
                    &::before {
                        color: #fff;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        & .slick-arrow.slick-prev,
        & .slick-arrow.slick-next {
            &::before {
                font-size: 18px;
            }
        }

        & .slick-dots {
            bottom: 10px !important;

            li {
                button {
                    &::before {
                        font-size: 10px;
                    }
                }
            }
        }
    }

    @media (max-width: 480px) {
        & .slick-arrow.slick-prev,
        & .slick-arrow.slick-next {
            &::before {
                font-size: 15px;
            }
        }

        & .slick-dots {
            bottom: 5px !important;

            li {
                button {
                    &::before {
                        font-size: 8px;
                    }
                }
            }
        }
    }
`;
