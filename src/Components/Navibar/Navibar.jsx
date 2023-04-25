import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import {
  Col, Row, Grid,
} from 'antd';
import AuthenticationButton from '../authentication/AuthenticationButton';
import { ShoppingCartButton, NotificationButton } from './Buttons';
import './navibar.css';

const { useBreakpoint } = Grid;

export default function Navibar() {
  const { lg } = useBreakpoint();

  const desktopFormat = lg ? 'inline' : 'none';
  const phoneFormat = lg ? 'none' : 'inline';
  const formatLogoSpan = lg ? 6 : 10;
  const formatLogo = lg ? 'center' : 'left';
  const formatButtonSpan = lg ? 6 : 14;
  const formatButton = lg ? 'center' : 'right';
  const logo = '/images/Delaware-logo_white.png';
  const logoSize = '200px';
  const color = '#EC4842';

  const navigate = useNavigate();

  const handleSearch = (e) => {
    navigate(`/products/product/${e}`, { replace: true });
    navigate(0);
  };

  return (
    <div>
      <Row style={{
        backgroundColor: color, textAlign: 'center', alignItems: 'center',
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
          <ShoppingCartButton />
          <NotificationButton />
          <AuthenticationButton />
        </Col>
      </Row>
      <Row style={{
        backgroundColor: '#E0433E', padding: '20px', textAlign: 'center', visibility: phoneFormat,
      }}
      >
        <Col span={24}>
          <div style={{
            textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          >
            <Col span={12}>
              <NavLink to="/products" replace>
                <h3 className="navibar-item">Products</h3>
              </NavLink>
            </Col>
            <Col span={12}>
              <NavLink to="/track&trace" replace>
                <h3 className="navibar-item">Track & Trace</h3>
              </NavLink>
            </Col>
          </div>
          <Search style={{ display: phoneFormat }} className="navibar-search" placeholder="Search" onSearch={handleSearch} size="large" />
        </Col>
      </Row>
    </div>
  );
}
