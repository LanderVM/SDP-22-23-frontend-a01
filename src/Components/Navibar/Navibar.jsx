import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import {
  Col, Row, Grid,
} from 'antd';
import AuthenticationButton from '../authentication/AuthenticationButton';
import { ProductsButton, NotificationButton } from './Buttons';

const { useBreakpoint } = Grid;

export default function Navibar() {
  const { lg } = useBreakpoint();

  const desktopFormat = lg ? 'inline' : 'none';
  const phoneFormat = lg ? 'none' : 'inline';
  const formatLogoSpan = lg ? 6 : 10;
  const formatLogo = lg ? 'center' : 'left';
  const formatButtonSpan = lg ? 6 : 14;
  const formatButton = lg ? 'center' : 'right';
  const logo = lg ? '/images/Delaware-logo_white.png' : '/images/LogoDelaware.png';
  const logoSize = lg ? '200px' : '50px';
  const color = '#EC4842';

  const navigate = useNavigate();

  const handleSearch = (e) => {
    navigate(`/products/product/${e}`);
    window.location.reload(false);
  };

  return (
    <div>
      <Row style={{
        backgroundColor: color, padding: '0px 10px', textAlign: 'center', alignItems: 'center',
      }}
      >
        <Col span={formatLogoSpan} style={{ textAlign: formatLogo }}>
          <NavLink className="logo" to="/home" replace>
            <img src={logo} width={logoSize} alt="Delaware logo" />
          </NavLink>
        </Col>
        <Col span={12} style={{ display: desktopFormat }}>
          <Search className="navibar-search" placeholder="Search" onSearch={handleSearch} size="large" />
        </Col>
        <Col
          span={formatButtonSpan}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: formatButton,
          }}
        >
          <ProductsButton />
          <NotificationButton />
          <AuthenticationButton />
        </Col>
      </Row>
      <Row style={{
        backgroundColor: '#E0433E', padding: '20px', textAlign: 'center', alignItems: 'center', visibility: phoneFormat,
      }}
      >
        <Col span={24} style={{ display: phoneFormat }}>
          <Search className="navibar-search" placeholder="Search" onSearch={handleSearch} size="large" />
        </Col>
      </Row>
    </div>
  );
}
