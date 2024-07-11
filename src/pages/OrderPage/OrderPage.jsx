import { Checkbox, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, StyledButton, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal, ButtonContainer } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserServices'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';
import styled from 'styled-components';

const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [listChecked, setListChecked] = useState([])
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })


  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === 'increase') {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }))
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }))
      }
    }
  }

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  const handleDelete = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }
  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }
  //
  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked])

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfo])
  //set value into form
  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  //price memo
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])
  // discount
  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + ((priceMemo * totalDiscount) / 100)
      //return total + (priceMemo * (totalDiscount  * cur.amount) / 100)
    }, 0)
    if (Number(result)) {
      return result
    }
    return 0
  }, [order])
  //dilivery
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 2000000 && priceMemo < 50000000) {
      return 10000
    } else if (priceMemo >= 50000000 || order?.orderItemsSlected?.length === 0) {
      return 0
    } else {
      return 20000
    }
  }, [priceMemo])
  //total price
  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

  const handleAddCard = () => {
    if (!order?.orderItemsSlected?.length) {
      message.error('Vui lòng chọn sản phẩm')
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true)
    } else {
      navigate('/payment')
    }
  }

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
        id,
        { ...rests }, token)
      return res
    },
  )

  const { isLoading, data } = mutationUpdate

  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails
    if (name && address && city && phone) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, city, phone }))
          setIsOpenModalUpdateInfo(false)
        }
      })
    }
  }
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }
  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 2.000.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 2.000.000 VND đến dưới 50.000.000 VND',
    },
    {
      title: 'Free ship',
      description: 'Trên 50.000.000 VND',
    },
  ]
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  return (
    <OrderContainer>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <WrapperLeft>
          <h3 style={{ fontWeight: 'bold' }}>Giỏ hàng</h3>
          <h4>Phí giao hàng</h4>
          <WrapperStyleHeaderDilivery>
            <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 10000
              ? 2 : diliveryPriceMemo === 20000 ? 1
                : order.orderItemsSlected.length === 0 ? 0 : 3} />
          </WrapperStyleHeaderDilivery>

          <WrapperStyleHeader>
            <span style={{ display: 'inline-block', width: '200px' }}>
              <CustomCheckbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></CustomCheckbox>
              <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
            </span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Thành tiền</span>
              <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleRemoveAllOrder()} />
            </div>
          </WrapperStyleHeader>
          <WrapperListOrder>
            {order?.orderItems?.map((order) => (
              <WrapperItemOrder key={order?.product}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <CustomCheckbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></CustomCheckbox>
                  <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover', marginRight: '10px' }} alt={order?.name} />
                  <div style={{ width: 'calc(100% - 97px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.name}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span>
                    <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                  </span>
                  <WrapperCountOrder>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                      <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                    <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInstock} />
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order.countInstock, order?.amount === 1)}>
                      <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                  </WrapperCountOrder>

                  <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice((order?.price * order?.amount))}</span>
                  <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDelete(order?.product)} />
                </div>
              </WrapperItemOrder>
            ))}
          </WrapperListOrder>
        </WrapperLeft>
        <WrapperRight>
          <div style={{ width: '100%' }}>
            <WrapperInfo>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Địa chỉ giao hàng : </span>
                  <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`} </span>
                </div>
                <div onClick={handleChangeAddress} style={{ color: '#9255FD', marginTop: '10px', fontSize: '15px', cursor: 'pointer', marginLeft: '200px' }}>Thay đổi</div>
              </div>
            </WrapperInfo>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #f0f0f0"
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Tạm tính </span>
                <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Giảm giá </span>
                <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Phí giao hàng </span>
                <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
              </div>
            </div>
            <WrapperTotal>
              <span>Tổng tiền</span>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
              </span>
            </WrapperTotal>
          </div>
          <ButtonContainer>
            <StyledButton onClick={() => handleAddCard()}>
              Mua Hàng
            </StyledButton>
          </ButtonContainer>
        </WrapperRight>
      </div>
      <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInforUser} >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent
                value={stateUserDetails['name']}
                onChange={handleOnchangeDetails}
                name="name"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent
                value={stateUserDetails['city']}
                onChange={handleOnchangeDetails}
                name="city"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </OrderContainer>
  )
}
const OrderContainer = styled.div`
  background: #fff;
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  padding: 20px;
  max-width: 1270px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default OrderPage