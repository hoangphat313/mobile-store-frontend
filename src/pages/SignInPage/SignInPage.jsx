import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image, message } from "antd";
import imgLogo from "../../assets/images/logo-login_2.png"
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserServices"
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux"
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const location = useLocation()
    const dispatch = useDispatch()
    const mutation = useMutationHooks(
        data => UserService.loginUser(data)

    )

    const { data, isLoading, isSuccess, isError } = mutation
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
            if (data?.access_token) {
                const decoded = jwt_decode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token)
                }
            }
        } else if (isError || data?.status === 'ERR') {
            message.error(data?.message || 'Đã xảy ra lỗi khi đăng nhập')
        }
    }, [isSuccess, isError, data, location, navigate])

    const handleGetDetailUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserService.getDetailUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
    }


    const [password, setPassword] = useState('')
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
    }

    const handlerNavigateSignUp = () => {
        navigate('/sign-up')
    }


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '600px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p style={{ fontSize: '15px' }}>Đăng nhập hoặc Tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="Enter your email address"
                        value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm placeholder="Enter your password" type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword} />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textbutton={'Đăng Nhập'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p style={{ fontSize: '14px' }}>Chưa có tài khoản? <WrapperTextLight onClick={handlerNavigateSignUp} style={{ cursor: 'pointer' }}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                {/* <WrapperContainerRight>
                    <Image src={imgLogo} preview={false} alt="img-logo" height="203px" width="203px" />
                    <h4 style={{ margin: '0 0 5px', color: '#FFFFFF', fontSize: '17px', fontWeight: '500' }}>Mua sắm tại AuraTech</h4>
                    <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>Siêu ưu đãi mỗi ngày</span>
                </WrapperContainerRight> */}
            </div>
        </div>
    )
}
export default SignInPage