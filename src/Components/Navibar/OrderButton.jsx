import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function OrderButton() {
  return (
    <NavLink to="/orders" className="user-item delaware-dropdown-button">
      <ShoppingCartOutlined twoToneColor="#FFFFFF" style={{ fontSize: '250%' }} />
      &nbsp;Orders
    </NavLink>
  );
}
