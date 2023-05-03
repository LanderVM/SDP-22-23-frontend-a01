import React from 'react';
import { NavLink } from 'react-router-dom';

// const size = '250%';

export function ShoppingCartButton() {
  return (
    <NavLink role="button" to="/shoppingCart" data-cy="navibar_shoppingCartButton">
      <img src="/images/shoppingCartWhite.png" alt="shopping cart page" width="40px" />
    </NavLink>
  );
}

export function NotificationButton() {
  return (
    <NavLink role="button" to="/notifications" data-cy="navibar_notificationsButton">
      <img src="/images/NotificationBel.png" alt="notifications" width="40px" />
    </NavLink>
  );
}
