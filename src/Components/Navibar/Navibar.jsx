import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Header } from 'antd/es/layout/layout';
// import './navibar.scss';
import Search from 'antd/es/input/Search';
import {
  Col, Row, Grid,
} from 'antd';
import AuthenticationButton from '../authentication/AuthenticationButton';
import { ProductsButton, NotificationButton } from './Buttons';

// const items = [
//   {
//     icon: React.createElement(LaptopOutlined),
//   },
//   {
//     icon: React.createElement(NotificationOutlined),
//   },
//   {
//     icon: React.createElement(UserOutlined),
//   },
// ];

const { useBreakpoint } = Grid;

export default function Navibar() {
  const { lg } = useBreakpoint();

  const phoneFormat = lg ? 'inline' : 'none';
  const formatLogoSpan = lg ? 6 : 10;
  const formatLogo = lg ? 'center' : 'left';
  const formatButtonSpan = lg ? 6 : 14;
  const formatButton = lg ? 'center' : 'right';
  const logo = lg ? '/images/Delaware-logo_white.png' : '/images/LogoDelaware.png';
  const logoSize = lg ? '200px' : '50px';
  const color = '#EC4842';

  return (
    <div>
      <Row style={{
        backgroundColor: color, padding: '20px', textAlign: 'center', alignItems: 'center',
      }}
      >
        <Col span={formatLogoSpan} style={{ textAlign: formatLogo }}>
          <NavLink className="logo" to="/home" replace>
            <img src={logo} width={logoSize} alt="Delaware logo" />
          </NavLink>
        </Col>
        <Col span={12} style={{ display: phoneFormat }}>
          <Search className="navibar-search" placeholder="Search" onSearch={console.log} size="large" />
        </Col>
        <Col span={formatButtonSpan} style={{ textAlign: formatButton }}>
          <ProductsButton />
          <NotificationButton />
          <AuthenticationButton />
        </Col>
      </Row>
    </div>
  // <Header className="navibar">
  //   <NavLink className="logo" to="/home" replace>
  //     <img className="logo-inner" src="/images/Delaware-logo_white.png" alt="Delaware logo" />
  //   </NavLink>
  //   <Search className="navibar-search" placeholder="Search"
  //   onSearch={console.log} size="large" />
  //   <Menu
  //     mode="horizontal"
  //     defaultSelectedKeys={['2']}
  //     items={items}
  //   />
  // </Header>
  );
}
