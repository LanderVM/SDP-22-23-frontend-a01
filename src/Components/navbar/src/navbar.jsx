import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Badge, ConfigProvider, Grid, Layout, Menu, Space, theme,
} from 'antd';
import { motion } from 'framer-motion';
import { AccountButton, NotificationButton, ShoppingCartButton } from './buttons';
import { ShoppingCartProducts } from '../../../contexts/shopping-cart-products';
import MobileDrawer from './mobile-drawer';
import { Notifications } from '../../../contexts/notifications';
import '../navbar.css';
import useScrollHeight from '../../../contexts/navbar-scroll';

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
  } = useContext(ShoppingCartProducts);

  const {
    amountNotReadNotifications,
    refreshAmountNotReadNotifications,
    setAmountNotReadNotifications,
  } = useContext(Notifications);

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

  const isFixed = useScrollHeight();

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isFixed ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: heightNB,
        paddingBottom: 10,
        background: color,
        zIndex: 999,
      }}
    >
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
                backgroundColor: color,
                color: 'white',
                fontSize: '25px',
                display: navMenu2MF,
                justifyContent: navMenuMF,
                height: heightNB,
              }}
              mode="horizontal"
              items={items}
            />
          </ConfigProvider>
        </div>
      </Header>
    </motion.nav>
  );
}
