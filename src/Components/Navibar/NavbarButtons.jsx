import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown } from 'antd';
import LogoutButtonDropDown from '../authentication/LogoutButton';
import LoginButtonDropDown from '../authentication/LoginButton';
import NotificationsDropdown from './NotificationsDropdown';

export function ShoppingCartButton() {
  return (
    <NavLink role="button" to="/shoppingCart" data-cy="navibar_shoppingCartButton">
      <ShoppingCartOutlined
        style={{
          fontSize: '250%',
          color: 'white',
        }}
        size={35}
      />
    </NavLink>
  );
}

export function NotificationButton() {
  return (
    <NotificationsDropdown />
  );
}

export function AccountButton() {
  const {
    isAuthenticated,
    user,
  } = useAuth0();

  if (!isAuthenticated) return <LoginButtonDropDown />;

  const items = [
    {
      label: (
        <div data-cy="navibar_dropdownMenu_profileButton">
          <NavLink to="/profile" className="user-item delaware-dropdown-button">
            <UserOutlined twoToneColor="#FFFFFF" style={{ fontSize: '250%' }} />
                        &nbsp;Company profile
          </NavLink>
        </div>
      ),
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div>
          <LogoutButtonDropDown />
        </div>
      ),
      key: '3',
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
    >
      <img
        src={user.picture}
        alt=""
        width="35px"
        data-cy="test-navbar-userIcon"
        style={{
          fontSize: '250%',
          marginTop: '40%',
        }}
      />
    </Dropdown>
  );
}
