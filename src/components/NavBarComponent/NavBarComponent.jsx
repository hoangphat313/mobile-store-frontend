import { Checkbox, Col, Rate, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { WrapperTypeProduct } from '../../pages/HomePage/style'
import TypeProduct from '../TypeProduct/Typeproduct'
import * as ProductService from '../../services/ProductService'

const NavBarComponent = () => {

    const [typeProducts, setTypeProducts] = useState([])
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <div style={{ height: '100%', width: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #ccc' }}>
            <WrapperLableText>Product Type</WrapperLableText>
            <div style={{ margin: '0 auto', marginBottom: '20px' }}>
                {typeProducts.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}
            </div>
        </div>
    )
}

export default NavBarComponent