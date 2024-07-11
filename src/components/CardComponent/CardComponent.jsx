import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperReportText, WrapperStyleTextSell, WrraperDiscountText, WrraperPriceText } from "./style";
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logoauth.png'
import { Link, useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img src={image} alt="example" ></img>}
            //cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            onClick={() => handleDetailsProduct(id)}
        >
            <img src={logo} preview={false}
                style={{
                    width: '68px', height: '14px', position: 'absolute', top: -1, left: -1,
                    borderTopLeftRadius: '3px'
                }} />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                </span>
                <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
            <div style={{ color: '#222222', fontSize: '13px' }}>
                Số lượng hàng còn {countInStock}
            </div>
            <WrraperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrraperDiscountText>
                    -{discount || 5}%
                </WrraperDiscountText>
            </WrraperPriceText>
        </WrapperCardStyle>
    )
}
export default CardComponent