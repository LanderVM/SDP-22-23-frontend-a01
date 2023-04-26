import React from 'react';
import { NavLink } from 'react-router-dom';

// const size = '250%';

export function ShoppingCartButton() {
  return (
    <NavLink role="button" to="/shoppingCart">
      <img src="/images/shoppingCartWhite.png" alt="shopping cart page" width="50px" />
    </NavLink>
  );
}

export function NotificationButton() {
  return (
    <NavLink role="button" to="/notifications">
      <img src="/images/NotificationBel.png" alt="notifications" width="50px" style={{ margin: '10px' }} />
    </NavLink>
  );
}
