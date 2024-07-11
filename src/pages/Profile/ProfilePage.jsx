import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { getBase64 } from "../../utils";

const WrapperHeader = styled.h1`
    color: #000;
    font-size: 23px;
    margin: 20px auto;
    text-align: center;
`;

const WrapperContentProfile = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
`;

const WrapperInput = styled.div`
    margin-bottom: 20px;
`;

const WrapperLabel = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
`;

const WrapperUploadFile = styled(Upload)`
    .ant-upload-select-picture-card {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
`;

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const mutation = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data;
            const res = UserService.updateUser(id, { ...rests }, token);
            return res;
        }
    );
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            message.success('Cập nhật thành công');
            dispatch(updateUser({ ...data.data, access_token: user?.access_token }));
        } else if (isError) {
            message.error('Cập nhật thất bại');
        }
    }, [isSuccess, isError, data, dispatch, user?.access_token]);

    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            setName(user.name || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setAvatar(user.avatar || '');
        }
    }, [user]);

    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token });
    };

    return (
        <WrapperContentProfile>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isLoading={isLoading}>
                <div>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm style={{ width: '100%' }} id="name" value={name} onChange={handleOnchangeName} />
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm style={{ width: '100%' }} id="email" value={email} onChange={handleOnchangeEmail} />
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm style={{ width: '100%' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm style={{ width: '100%' }} id="address" value={address} onChange={handleOnchangeAddress} />
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '120px',
                                width: '120px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginTop: '10px'
                            }} alt="avatar" />
                        )}
                    </WrapperInput>

                    <ButtonComponent
                        onClick={handleUpdate}
                        textbutton={'Cập nhật'}
                        styleButton={{ marginTop: '20px' }}
                        styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    />
                </div>
            </Loading>
        </WrapperContentProfile>
    );
};

export default ProfilePage;
