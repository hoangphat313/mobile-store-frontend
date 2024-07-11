import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import {UserOutlined,AppstoreOutlined,ShoppingCartOutlined} from "@ant-design/icons"
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import OrderAdmin from "../../components/OrderAdmin/OrderAdmin";



const AdminPage = () => {
    const items = [
        getItem('Người Dùng', 'user',<UserOutlined />),
        getItem('Sản Phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
    ];


    const [keySelected,setKeySelected] = useState('')
    const renderPage = (key) => {
        switch(key){
            case 'user':
                return (
                    <AdminUser/>
                )
            case 'product':
                return (
                    <AdminProduct/>
                )
            case 'orders':
                return (
                    <OrderAdmin />
            )
            default:
                return <></>
        }
        
    }
  
    const handleOnClick = ({key}) => {
        setKeySelected(key)
    }
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{display:'flex',height:'500px'}}>
                <Menu
                    mode="inline"
                    style={{
                        width: '256px',
                        //boxShadow: '1px 1px ',
                        height:'100vh'
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{flex: 1,padding:'15px 0 15px'}}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
        
    )

}
export default AdminPage