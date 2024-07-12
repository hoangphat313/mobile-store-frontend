import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
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
    WraperContextPupop,
    WrapperHeader,
    WrapperHeaderAccount,
    WrapperTextHeader,
    WrapperTextHeaderSmall
} from "./style";

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
            <WraperContextPupop onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WraperContextPupop>
            {user?.isAdmin && (
                <WraperContextPupop onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WraperContextPupop>
            )}
            <WraperContextPupop onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WraperContextPupop>
            <WraperContextPupop onClick={() => handleClickNavigate()}>Đăng xuất</WraperContextPupop>
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
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
                <img src={imgLogo} alt="logo" style={{ height: '50px', width: '50px', marginRight: '10px' }} />
                <WrapperTextHeader>AuraTech</WrapperTextHeader>
            </div>
            {!isHiddenSearch && (
                <Col xs={0} sm={14}>
                    <ButtonInputSearch
                        size="large"
                        bordered={false}
                        textbutton="Search"
                        placeholder="Bạn tìm gì hôm nay..."
                        onChange={onSearch}
                    />
                </Col>
            )}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Loading isLoading={loading}>
                    <WrapperHeaderAccount>
                        {userAvatar ? (
                            <img src={userAvatar} alt="avatar" style={{
                                height: '40px',
                                width: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} />
                        ) : (
                            <UserOutlined style={{ fontSize: '30px' }} />
                        )}
                        {user?.access_token ? (
                            <Popover content={content} trigger="click" open={isOpenPopup}>
                                <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>
                                    {userName?.length ? userName : user?.email}
                                </div>
                            </Popover>
                        ) : (
                            <div onClick={handlerNavigateLogin} style={{ cursor: 'pointer' }}>
                                <div>
                                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperHeaderAccount>
                </Loading>
                {!isHiddenCart && (
                    <div>
                        <Badge count={order?.orderItems?.length} size="small" onClick={() => navigate('/order')}>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff', cursor: 'pointer' }} />
                        </Badge>
                        <WrapperTextHeaderSmall onClick={() => navigate('/order')}></WrapperTextHeaderSmall>
                    </div>
                )}
            </div>
        </WrapperHeader>
    );
};

export default HeaderComponent;
