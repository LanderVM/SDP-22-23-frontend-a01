import {
  Drawer, Menu, Space,
} from 'antd';
import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const items = [
  {
    label: (
      <NavLink to="/products">
        Products
      </NavLink>
    ),
    key: 'products',
  },
  {
    label: (
      <NavLink to="/track">
        Track & Trace
      </NavLink>
    ),
    key: 'track',
  },
  {
    label: (
      <NavLink to="/orders">
        Orders
      </NavLink>
    ),
    key: 'orders',
  },
];

export default function NavbarMobileDrawer() {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);
  const onClose = () => {
    setToggled(false);
  };
  const heightNB = '70px';

  return (
    <Space
      align="center"
      style={{
        float: 'right', height: heightNB, marginTop: '7px', marginRight: '7px',
      }}
    >
      <MenuOutlined
        style={{
          fontSize: '250%',
          color: 'white',
        }}
        size={25}
        className="trigger"
        onClick={toggleTrueFalse}
      />
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
          style={{ backgroundColor: '#f5f5f5', paddingTop: '15px' }}
          items={items}
        />
      </Drawer>
    </Space>
  );
}
