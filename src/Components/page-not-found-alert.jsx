import React from 'react';
import { Result, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <main style={{ marginTop: '15vh', minHeight: 'calc(85vh - 90px)' }}>
      <Result
        status="404"
        title="Page Not Found"
        subTitle={`Sorry, the page "${location.pathname}" does not exist.`}
        extra={<Button type="primary" onClick={handleClick}>Go to Homepage</Button>}
      />
    </main>
  );
}
