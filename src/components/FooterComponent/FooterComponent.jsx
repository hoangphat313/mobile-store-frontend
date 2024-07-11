import React from "react";
import { FooterStyled, FooterTextStyled } from "./style";
import { InstagramFilled, FacebookFilled } from '@ant-design/icons';

const FooterComponent = () => {
    return (
        <FooterStyled>
            <FooterTextStyled span={24} sm={8}>
                <h2>LIÊN HỆ</h2>
                <p>&#x1F4CC;127/14, Hoàng Hoa Thám, P13, Quận Tân Bình, TP HCM</p>
                <p>&#9742; Phone: 039 570 4727</p>
                <p>&#9993; Email: phoangphat313@gmail.com</p>
            </FooterTextStyled>
            <FooterTextStyled span={24} sm={8}>
                <h2>CHÍNH SÁCH HỖ TRỢ</h2>
                <p>Tìm kiếm</p>
                <p>Giới thiệu</p>
                <p>Chính sách thanh toán</p>
                <p>Chính sách hỗ trợ</p>
                <p>Chính sách đổi trả và hoàn tiền</p>
            </FooterTextStyled>
            <FooterTextStyled span={24} sm={8}>
                <h2>LIÊN KẾT VỚI CHÚNG TÔI</h2>
                <p>Hãy kết nối với chúng tôi</p>
                <div className="footer_icon">
                    <a href="https://www.facebook.com/hphat.031"><FacebookFilled style={{ fontSize: '25px', cursor: 'pointer', color: '#fff', marginRight: '8px' }} /></a>
                    <a href="https://www.instagram.com/if.hphat/"><InstagramFilled style={{ fontSize: '25px', cursor: 'pointer', color: '#fff' }} /></a>
                </div>
            </FooterTextStyled>
        </FooterStyled>
    );
};

export default FooterComponent;
