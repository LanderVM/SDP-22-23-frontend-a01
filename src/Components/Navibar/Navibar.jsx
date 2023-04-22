import React from 'react';
import { Header } from 'antd/es/layout/layout';
import './navibar.css';
import { Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';

const items = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

export default function Navibar() {
  return (
    <Header>
      <img className="logo" src="/images/Delaware-logo_white.png" alt="Delaware logo" />
      <Search placeholder="input search text" onSearch={console.log} enterButton />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
      />
    </Header>
  );
}
