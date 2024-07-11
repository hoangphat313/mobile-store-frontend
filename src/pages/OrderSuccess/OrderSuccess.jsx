import React from 'react';
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo, WrapperRight, WrapperTotal } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';

const OrderSucess = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Loading isLoading={false}>
        <div style={{ maxWidth: '1270px', margin: '0 auto', padding: '20px' }}>
          <h2 style={{ paddingTop: '10px' }}>Đơn hàng đặt thành công</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable style={{ fontSize: '16px' }}>Phương thức giao hàng</Lable>
                  <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable style={{ fontSize: '16px' }}>Phương thức thanh toán</Lable>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order) => (
                  <WrapperItemOrder key={order?.name}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} alt={order.name} />
                      <div style={{ flex: 1, width: '250px', overflow: 'hidden', fontSize: '14px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '20px' }}>{order?.name}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '14px', color: '#242424', paddingRight: '50px' }}>Số lượng: {order?.amount}</span>
                      <span style={{ fontSize: '14px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                    </div>
                  </WrapperItemOrder>
                ))}
              </WrapperItemOrderInfo>
            </WrapperContainer>

          </div>
          <WrapperRight>
            <div style={{ marginTop: '20px' }}>
              <span style={{ fontSize: '20px', color: 'red', fontWeight: '700' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
            </div>
          </WrapperRight>
        </div>
      </Loading>
    </div>
  );
}

export default OrderSucess;
