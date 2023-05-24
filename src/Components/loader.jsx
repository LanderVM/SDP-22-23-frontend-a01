import React from 'react';
import { Spin } from 'antd';

export default function Loader({ loading }) {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin tip="Loading.." size="large" />
      </div>
    );
  }

  return null;
}
