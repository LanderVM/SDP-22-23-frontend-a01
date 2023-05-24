import React from 'react';
import { Result, Button } from 'antd';
import { useLocation } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();

  return (
    <Result
      status="404"
      title="404"
      subTitle={`Sorry, the page ${location.pathname} does not exist.`}
      extra={<Button type="primary" href="/">Back Home</Button>}
    />
  );
}
