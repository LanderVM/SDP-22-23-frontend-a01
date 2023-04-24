import React from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

// const size = '250%';

export function ProductsButton() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <NavLink onClick={handleClick} onKeyDown={handleClick} role="button">
      <img src="/images/shopIcon2.png" alt="products page" width="50px" />
    </NavLink>
  );
}

export function NotificationButton() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/notifications');
  };

  return (
    <NavLink onClick={handleClick} onKeyDown={handleClick} role="button">
      <img src="/images/NotificationBel.png" alt="notifications" width="50px" style={{ margin: '10px' }} />
    </NavLink>
  );
}
