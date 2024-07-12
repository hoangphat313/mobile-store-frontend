import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperNavbar, WrapperProducts, ResponsivePagination } from './style';

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);

    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [paginate, setPaginate] = useState({
        page: 0,
        limit: 5,
        total: 1,
    });

    const fetchProductType = async (type, page, limit) => {
        setLoading(true);
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status === 'OK') {
            setLoading(false);
            setProducts(res?.data);
            setPaginate({ ...paginate, total: res?.totalPage });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, paginate.page, paginate.limit);
        }
    }, [state, paginate.page, paginate.limit]);

    const onChange = (current, pageSize) => {
        setPaginate({ ...paginate, page: current - 1, limit: pageSize });
    };

    return (
        <Loading isLoading={loading}>
            <div style={{ width: '100%', background: '#fff', minHeight: '100vh' }}>
                <div style={{ width: '1270px', margin: '0 auto' }}>
                    <Row gutter={16} style={{ marginTop: '10px' }}>
                        <Col span={4} style={{ paddingRight: '16px' }}>
                            <WrapperNavbar>
                                <NavBarComponent />
                            </WrapperNavbar>
                        </Col>
                        <Col span={20}>
                            <WrapperProducts>
                                {products?.filter((pro) => {
                                    if (searchDebounce === '') {
                                        return pro;
                                    } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                        return pro;
                                    }
                                })?.map((product) => (
                                    <CardComponent
                                        key={product._id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        selled={product.selled}
                                        discount={product.discount}
                                        id={product._id}
                                    />
                                ))}
                            </WrapperProducts>
                            <ResponsivePagination
                                current={paginate.page + 1}
                                total={paginate.total * paginate.limit}
                                pageSize={paginate.limit}
                                onChange={onChange}
                                showSizeChanger={false}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    );
};

export default TypeProductPage;
