import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Menu, Badge, Layout, Space, Grid, theme, ConfigProvider,
} from 'antd';
import { NotificationButton, ShoppingCartButton, AccountButton } from './src/buttons';
import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';
import './navbar.scss';
import MobileDrawer from './src/mobile-drawer';
import { NotificationsContext } from '../../Contexts/NotificationsContext';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const color = '#EC4842';
const heightNB = '70px';

const headerStyle = {
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
    style: {
      marginRight: '3%',
      fontSize: '30px',
    },
  },
  {
    label: (
      <NavLink to="/track">
        Track & Trace
      </NavLink>
    ),
    key: 'track',
    style: {
      marginRight: '3%',
      fontSize: '30px',
    },
  },
  {
    label: (
      <NavLink to="/orders">
        Orders
      </NavLink>
    ),
    key: 'orders',
    style: {
      fontSize: '30px',
    },
  },
];
export default function Navbar() {
  const navigate = useNavigate();
  const { lg } = useBreakpoint();

  const {
    productsFromContext,
  } = useContext(ProductsForShoppingCartContext);

  const { amountNotReadNotifications, refreshAmountNotReadNotifications, setAmountNotReadNotifications } = useContext(NotificationsContext);

  const { isAuthenticated } = useAuth0();

  const onClick = (e) => {
    navigate(`/${e.key}`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshAmountNotReadNotifications();
    } else {
      setAmountNotReadNotifications(0);
    }
  }, [isAuthenticated]);

  const logo = '/images/Delaware-logo_white.png';
  const navMenuMF = lg ? 'center' : 'left';
  const navMenu2MF = lg ? 'flex' : 'none';

  return (
    <Header style={headerStyle}>
      <div>
        <div style={{
          float: 'left', display: 'flex',
        }}
        >
          <MobileDrawer />
          <NavLink data-cy="navibar_logo" to="/home" style={{ paddingTop: '5px' }} replace>
            <img src={logo} height="60px" alt="Delaware logo" />
          </NavLink>
        </div>
        <Space align="center" style={{ float: 'right', height: heightNB, marginTop: '7px' }}>
          <Badge
            count={productsFromContext === null ? 0 : productsFromContext.map((e) => e.amount).reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0,
            )}
            color="geekblue"
            offset={[3, 2]}
            data-cy="shoppingCartBadge"
            overflowCount={99}
            size="default"
          >
            <ShoppingCartButton />
          </Badge>
          <Badge
            count={amountNotReadNotifications}
            color="geekblue"
            offset={[-5, 2]}
            data-cy="amountNotReadNotifications"
            overflowCount={99}
            size="default"
          >
            <NotificationButton />
          </Badge>
          <AccountButton />
        </Space>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: '#fff' } }}>
          <Menu
            onClick={onClick}
            style={{
              backgroundColor: color, color: 'white', fontSize: '25px', display: navMenu2MF, justifyContent: navMenuMF, height: heightNB,
            }}
            mode="horizontal"
            items={items}
          />
        </ConfigProvider>
      </div>
    </Header>
  );
}
