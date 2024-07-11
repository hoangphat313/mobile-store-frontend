import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imgLogo from "../../assets/images/logo-login.png"
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { Link, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserServices"
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message"
const SignUpPage = () => {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )
    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        if (isSuccess && data?.status == "OK") {
            message.success('Đăng ký tài khoản thành công')
            handlerNavigateSignIn()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }
    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword })
    }

    const navigate = useNavigate()
    const handlerNavigateSignIn = () => {
        navigate('/sign-in')
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p style={{ fontSize: '15px' }}>Đăng nhập hoặc Tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="Enter your email address" value={email} onChange={handleOnchangeEmail} />
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
                        <InputForm placeholder="Enter your password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                                isShowConfirmPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm placeholder="Enter your confirm password" type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={40}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textbutton={'Đăng Ký'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}
                        ></ButtonComponent>
                    </Loading>
                    <p style={{ fontSize: '14px' }}>Bạn đã có tài khoản? <WrapperTextLight onClick={handlerNavigateSignIn} style={{ cursor: 'pointer' }}>Đăng nhập</WrapperTextLight></p>
                </WrapperContainerLeft>

                {/* <WrapperContainerRight>
                    <Image src={imgLogo} preview={false} alt="img-logo" height="203px" width="203px" />
                    <h4 style={{ margin: '0 0 5px', color: 'rgb(11, 116, 229)', fontSize: '17px', fontWeight: '500' }}>Mua sắm tại AuraTech</h4>
                    <span style={{ color: 'rgb(11, 116, 229)', fontSize: '13px', fontWeight: '500' }}>Siêu ưu đãi mỗi ngày</span>
                </WrapperContainerRight> */}
            </div>
        </div>
    )
}
export default SignUpPage