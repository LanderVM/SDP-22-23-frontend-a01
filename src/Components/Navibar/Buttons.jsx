import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// const size = '250%';

export function ShoppingCartButton() {
  return (
    <NavLink role="button" to="/shoppingCart" data-cy="navibar_shoppingCartButton">
      <ShoppingCartOutlined
        style={{
          fontSize: '250%',
          color: 'white',
        }}
        size={35}
      />
    </NavLink>
  );
}

export function NotificationButton() {
  return (
    <NavLink role="button" to="/notifications" data-cy="navibar_notificationsButton">
      <NotificationOutlined
        style={{
          fontSize: '250%',
          color: 'white',
        }}
        size={35}
      />
    </NavLink>
  );
}
