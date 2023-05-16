import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown } from 'antd';
import LoginButtonDropDown from './LoginButton';
import LogoutButtonDropDown from './LogoutButton';
import ProfileButton from '../Navibar/ProfileButton';

const items = [

  {
    label: (
      <div data-cy="navibar_dropdownMenu_profileButton">
        <ProfileButton />
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

  return <LoginButtonDropDown />;
}
