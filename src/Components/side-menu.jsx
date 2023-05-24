import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { RiShoppingBasket2Line } from 'react-icons/ri';
import Sider from 'antd/es/layout/Sider';
import { Button, Drawer, Menu } from 'antd';

const items = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: (
      <NavLink to="/profile" className="user-item delaware-dropdown-button">
        <p>Account Overview</p>
      </NavLink>
    ),
    style: { padding: '0', margin: '0' },
  },
  {
    key: 'orders',
    icon: <RiShoppingBasket2Line />,
    label: (
      <NavLink to="/orders" className="user-item delaware-dropdown-button">
        <p>Orders</p>
      </NavLink>
    ),
    style: { padding: '0', margin: '0' },
  },
];

export default function SideMenu({ selectedKey }) {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);
  const onClose = () => {
    setToggled(false);
  };

  return (
    <>
      <Button
        className="trigger"
        onClick={toggleTrueFalse}
        style={{
          position: 'fixed',
          top: '50%',
          left: '0%',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        }}
        size="large"
      >
        {isToggled
          ? <MenuUnfoldOutlined />
          : <MenuFoldOutlined />}
      </Button>
      <Drawer
        placement="left"
        onClose={onClose}
        closable
        open={isToggled}
        className="hideOnDesktop"
        bodyStyle={{ backgroundColor: '#f5f5f5' }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={selectedKey}
          style={{ backgroundColor: '#f5f5f5', paddingTop: '15px' }}
          items={items}
        />
      </Drawer>
      <Sider
        style={{ backgroundColor: '#f5f5f5', height: '70vh', borderInlineEnd: '1px solid rgba(5, 5, 5, 0.06)' }}
        className="hideOnMobile"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={selectedKey}
          style={{ backgroundColor: '#f5f5f5', paddingTop: '15px' }}
          items={items}
        />
      </Sider>
    </>
  );
}
