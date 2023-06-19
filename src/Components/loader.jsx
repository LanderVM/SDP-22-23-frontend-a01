import React from 'react';
import { Spin } from 'antd';

export default function Loader({ loading, extraStyle }) {
  if (loading) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', ...extraStyle,
      }}
      >
        <Spin tip="Loading.." size="large" />
      </div>
    );
  }

  return null;
}
