import React, { useEffect, useState } from "react";
import { Badge, Popover } from "antd";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingComponent/Loading";
import * as UserService from "../../services/UserServices";
import { resetUser } from '../../redux/slides/userSlide';
import { searchProduct } from "../../redux/slides/productSlide";
import imgLogo from "../../assets/images/logo-login_2.png";
import {
    WrapperContextPopup,
    WrapperHeader,
    WrapperHeaderAccount,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
    CartWrapper
} from "./style";
import styled from "styled-components";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userName, setUsername] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [search, setSearch] = useState('');
    const order = useSelector((state) => state.order);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlerNavigateLogin = () => {
        navigate('sign-in');
    };

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        navigate('/');
        dispatch(resetUser());
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        setUsername(user?.name);
        setUserAvatar(user?.avatar);
        setLoading(false);
    }, [user?.name, user?.avatar]);

    const content = (
        <div>
            <WrapperContextPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContextPopup>
            {user?.isAdmin && (
                <WrapperContextPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContextPopup>
            )}
            <WrapperContextPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContextPopup>
            <WrapperContextPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContextPopup>
        </div>
    );

    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user');
        } else if (type === 'admin') {
            navigate('/system/admin');
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            });
        } else {
            handleLogout();
        }
        setIsOpenPopup(false);
    };

    const onSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value));
    };

    return (
        <WrapperHeader>
            <LogoWrapper onClick={() => navigate('/')}>
                <img src={imgLogo} alt="logo" />
                <WrapperTextHeader>AuraTech</WrapperTextHeader>
            </LogoWrapper>
            {!isHiddenSearch && (
                <SearchWrapper>
                    <ButtonInputSearch
                        size="large"
                        bordered={false}
                        textbutton="Search"
                        placeholder="Bạn tìm gì hôm nay..."
                        onChange={onSearch}
                    />
                </SearchWrapper>
            )}
            <AccountWrapper>
                <Loading isLoading={loading}>
                    <WrapperHeaderAccount>
                        {userAvatar ? (
                            <img style={{ cursor: 'pointer' }} src={userAvatar} alt="avatar" />
                        ) : (
                            <UserOutlined style={{ fontSize: '30px' }} />
                        )}
                        {user?.access_token ? (
                            <Popover content={content} trigger="click" open={isOpenPopup}>
                                <div style={{
                                    cursor: 'pointer', maxWidth: 100, overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                                    onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}
                                </div>
                            </Popover>
                        ) : (
                            <div onClick={handlerNavigateLogin}>
                                <WrapperTextHeaderSmall>Đăng nhập/ Đăng ký</WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperHeaderAccount>
                </Loading>
                {!isHiddenCart && (
                    <CartWrapper>
                        <Badge count={order?.orderItems?.length} size="small" onClick={() => navigate('/order')}>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff', cursor: 'pointer' }} />
                        </Badge>
                    </CartWrapper>
                )}
            </AccountWrapper>
        </WrapperHeader>
    );
};

export default HeaderComponent;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
        height: 50px;
        width: 50px;
        margin-right: 10px;
    }
`;

const SearchWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    max-width: 400px; 

    @media (max-width: 820px) {
        flex: 2;
        max-width: 100%; 
    }
`;

const AccountWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;
