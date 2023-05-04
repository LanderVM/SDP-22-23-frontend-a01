import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown } from 'antd';
import LoginButtonDropDown from './LoginButton';
import LogoutButtonDropDown from './LogoutButton';
import OrderButton from '../Navibar/OrderButton';
import TrackTraceButton from '../Navibar/TrackTraceButton';

const items = [
  {
    label: (
      <div data-cy="navibar_dropdownMenu_orderButton">
        <OrderButton />
      </div>
    ),
    key: '0',
  },
  {
    label: (
      <div>
        <TrackTraceButton />
      </div>
    ),
    key: '1',
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

export default function AuthenticationButton() {
  const {
    isAuthenticated,
    user,
  } = useAuth0();

  if (isAuthenticated) {
    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
      >
        <img src={user.picture} alt="" width="40px" data-cy="test-navbar-userIcon" />
      </Dropdown>
    );
  }

  return <LoginButtonDropDown />;
}
