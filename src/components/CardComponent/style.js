import { Card } from "antd"
import styled from "styled-components"

export const WrapperCardStyle = styled(Card)`
 
    width: 200px;
    & img{
        height:200px;
        width:200px;
    },
    position:relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`
export const StyleNameProduct = styled.div`
  font-weight: 700;
  font-size:13px;
  line-height:16px;
  color: rgb(56 56 61);  
`
export const WrapperReportText = styled.div`
    font-size: 12px;
    color: rgb(128 128 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`
export const WrraperPriceText = styled.div`
    color: rgb(255,66,78);
    font-size: 16px;
    font-weight: 500;
`
export const WrraperDiscountText = styled.span`
    color: rgb(255,66,78);
    font-size: 12px;
    font-weight: 500;
`
export const WrapperStyleTextSell = styled.span`
    font-size:15px;
    line-height: 24px;
    color: rgb(120,120,120);
`