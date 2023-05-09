import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Menu, Badge, Layout, Space, Grid, Dropdown,
} from 'antd';
import { NotificationButton, ShoppingCartButton } from './Buttons';
import AuthenticationButton from '../authentication/AuthenticationButton';
import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const color = '#EC4842';
const heightNB = '70px';

const headerStyle = {
  color: '#fff',
  height: heightNB,
  padding: '0 3%',
  backgroundColor: color,
};

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
      <NavLink to="/notifications">
        Notifications
      </NavLink>
    ),
    key: 'notifications',
  },
];
function NavBar2() {
  const navigate = useNavigate();
  const { lg } = useBreakpoint();

  const {
    productsFromContext,
  } = useContext(ProductsForShoppingCartContext);

  const onClick = (e) => {
    navigate(`/${e.key}`);
  };

  const logo = '/images/Delaware-logo_white.png';
  const navMenuMF = lg ? 'center' : 'left';
  const navMenu1MF = lg ? 'none' : 'flex';
  const navMenu2MF = lg ? 'flex' : 'none';

  return (
    <Header style={headerStyle}>
      <div>
        <div style={{
          float: 'left', display: 'flex',
        }}
        >
          <Dropdown
            style={{
              backgroundColor: color, color: 'white', fontSize: '25px', height: heightNB,
            }}
            menu={{ items }}
            trigger={['click']}
          >
            <Space style={{ paddingRight: '10px', display: navMenu1MF }}>
              <img src="/images/menu.png" width="30px" alt="" />
            </Space>
          </Dropdown>
          <NavLink data-cy="navibar_logo" to="/home" style={{ paddingTop: '5px' }} replace>
            <img src={logo} height="60px" alt="Delaware logo" />
          </NavLink>
        </div>
        <Space align="center" style={{ float: 'right', height: heightNB, marginTop: '7px' }}>
          <Badge count={productsFromContext === null ? 0 : productsFromContext.length} color="geekblue" offset={[3, 5]} data-cy="shoppingCartBadge">
            <ShoppingCartButton />
          </Badge>
          <NotificationButton />
          <AuthenticationButton />
        </Space>
        <Menu
          onClick={onClick}
          style={{
            backgroundColor: color, color: 'white', fontSize: '25px', display: navMenu2MF, justifyContent: navMenuMF, height: heightNB,
          }}
          mode="horizontal"
          items={items}
        />
      </div>
    </Header>
  );
}
export default NavBar2;
