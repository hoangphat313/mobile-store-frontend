import styled from 'styled-components';
import { Col, Pagination } from 'antd';

export const WrapperProducts = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
    height: calc(100vh - 200px); 

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }

    @media (min-width: 769px) {
        flex-direction: row;
    }
`;

export const WrapperNavbar = styled(Col)`
    background: #fff; 
    margin-right: 10px;
    padding: 10px;z
    border-radius: 4px;
    height: fit-content;
    margin-top: 20px;
    width: 150px;

    @media (max-width: 768px) {
        width: 100px;
    }
`;
export const ResponsivePagination = styled(Pagination)`
    text-align: center;
    margin-top: 10px;

    @media (max-width: 768px) {
        .ant-pagination-item {
            flex: 1 0 33.33%; /* Each item takes up 33.33% width */
            max-width: 33.33%;
            text-align: center;
        }
        
        .ant-pagination-prev, .ant-pagination-next {
            flex: 0 0 33.33%; /* Prev and Next buttons take up 33.33% width */
            max-width: 33.33%;
            text-align: center;
        }
    }
`;