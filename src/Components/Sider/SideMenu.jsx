import { Menu } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { RiShoppingBasket2Line } from 'react-icons/ri';
import Sider from 'antd/es/layout/Sider';

const items = [
  {
    key: 'sidenav1',
    icon: <UserOutlined />,
    label: (
      <NavLink to="/profile" className="user-item delaware-dropdown-button">
        <p>Account Overview</p>
      </NavLink>
    ),
    style: { padding: '0', margin: '0' },
  },
  {
    key: 'sidenav2',
    icon: <RiShoppingBasket2Line />,
    label: (
      <NavLink to="/orders" className="user-item delaware-dropdown-button">
        <p>Orders</p>
      </NavLink>
    ),
    style: { padding: '0', margin: '0' },
  },
];

export default function SideMenu() {
  return (
    <Sider style={{ backgroundColor: '#f5f5f5' }} breakpoint="lg" collapsedWidth={0} reverseArrow>
      <Menu
        mode="inline"
        defaultSelectedKeys={['sidenav2']}
        style={{ backgroundColor: '#f5f5f5', paddingTop: '15px' }}
        items={items}
      />
    </Sider>
  );
}
