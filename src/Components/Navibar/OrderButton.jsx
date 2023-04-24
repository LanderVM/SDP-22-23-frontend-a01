import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function OrderButton() {
  return (
    <div className="d-flex align-items-center">
      <ShoppingCartOutlined twoToneColor="#FFFFFF" style={{ fontSize: '250%' }} />
      &nbsp;Orders
    </div>
  );
}
