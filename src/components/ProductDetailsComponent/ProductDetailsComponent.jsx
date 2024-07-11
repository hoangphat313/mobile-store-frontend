import { Col, Image, Rate, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import * as ProductService from '../../services/ProductService';
import {
    WrapperAddressproduct, WrapperDesProduct, WrapperInputNumber, WrapperPriceDiscountProduct, WrapperPriceProduct, WrapperPriceTextProduct,
    WrapperQuanlityProduct, WrapperStyleNameProduct, WrapperStyleTextSell
} from "./style";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../LoadingComponent/Loading";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import styled from "styled-components";

const StyledRow = styled(Row)`
    padding: 16px;
    background: #fff;
    border-radius: 4px;

    @media (max-width: 768px) {
        padding: 8px;
    }
`;

const StyledCol = styled(Col)`
    padding-right: 8px;
    height: fit-content;

    @media (max-width: 768px) {
        padding-right: 0;
    }
`;

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const [errorLimitOrder, setErrorLimitOrder] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const onChange = (value) => {
        setNumProduct(Number(value));
    };

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };

    useEffect(() => {
        initFacebookSDK();
    }, []);

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
        if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false);
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true);
        }
    }, [numProduct]);

    useEffect(() => {
        if (order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng');
        }
        return () => {
            dispatch(resetOrder());
        };
    }, [order.isSucessOrder]);

    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumProduct(numProduct + 1);
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1);
            }
        }
    };

    const { isLoading, data: productDetails } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled: !!idProduct });

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock,
                        selled: productDetails?.selled
                    }
                }));
            } else {
                setErrorLimitOrder(true);
            }
        }
    };

    return (
        <Loading isLoading={isLoading}>
            <StyledRow gutter={[16, 16]}>
                <StyledCol xs={24} md={10}>
                    <Image src={productDetails?.image} preview={false} alt="image product" />
                </StyledCol>
                <Col xs={24} md={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div style={{ paddingBottom: '15px' }}>
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell> Đã bán {productDetails?.selled}+</WrapperStyleTextSell>
                    </div>
                    <WrapperDesProduct>
                        {productDetails?.description}
                    </WrapperDesProduct>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
                        <WrapperPriceDiscountProduct>Giảm {productDetails?.discount}%</WrapperPriceDiscountProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressproduct>
                        <div style={{ paddingBottom: '10px' }}>
                            <span>Giao đến: </span>
                            <span className="address">{user?.address}</span>
                        </div>
                        <span className="change-address">Đổi địa chỉ</span>
                    </WrapperAddressproduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số Lượng</div>
                        <WrapperQuanlityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQuanlityProduct>
                    </div>
                    <div style={{ paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                size={20}
                                styleButton={{
                                    background: 'rgb(255,57,69)',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                onClick={handleAddOrderProduct}
                                textbutton={'Thêm vào giỏ hàng '}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}
                            />
                            {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm hết hàng</div>}
                        </div>
                    </div>
                </Col>
            </StyledRow>
        </Loading>
    );
};
export default ProductDetailsComponent;
