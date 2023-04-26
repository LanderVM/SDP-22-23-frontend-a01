import React from 'react';
import { Spin } from 'antd';

export default function Loader({ loading }) {
  if (loading) {
    return (
      <Spin tip="Loading.." size="large" />
    );
  }

  return null;
}
