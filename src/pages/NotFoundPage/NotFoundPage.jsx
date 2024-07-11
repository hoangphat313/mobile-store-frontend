import React from "react";
import { Button, Result } from 'antd';
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button onClick={() => navigate('/')} type="primary">Back Home</Button>}
  />
    )
}
export default NotFoundPage