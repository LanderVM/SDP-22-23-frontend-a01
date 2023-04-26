import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function OrderButton() {
  return (
    <div className="delaware-dropdown-button">
      <ShoppingCartOutlined twoToneColor="#FFFFFF" style={{ fontSize: '250%' }} />
      &nbsp;Orders
    </div>
  );
}
