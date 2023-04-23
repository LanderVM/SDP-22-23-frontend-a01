import React from 'react';
import { useNavigate } from 'react-router';
import { ShopOutlined, NotificationOutlined } from '@ant-design/icons';

const size = '250%';

export function ProductsButton() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <ShopOutlined style={{ fontSize: size }} onClick={handleClick} />
  );
}

export function NotificationButton() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/notifications');
  };

  return (
    <NotificationOutlined style={{ fontSize: size, padding: '20px' }} onClick={handleClick} />
  );
}
