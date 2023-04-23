import React from 'react';
import { Header } from 'antd/es/layout/layout';
import './navibar.scss';
import Search from 'antd/es/input/Search';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const items = [
  {
    icon: React.createElement(LaptopOutlined),
  },
  {
    icon: React.createElement(NotificationOutlined),
  },
  {
    icon: React.createElement(UserOutlined),
  },
];

export default function Navibar() {
  return (
    <Header className="navibar">
      <NavLink className="logo" to="/home" replace>
        <img className="logo-inner" src="/images/Delaware-logo_white.png" alt="Delaware logo" />
      </NavLink>
      <Search className="navibar-search" placeholder="Search" onSearch={console.log} size="large" />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
      />
    </Header>
  );
}
