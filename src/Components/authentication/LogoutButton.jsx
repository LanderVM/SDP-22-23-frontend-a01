import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function LogoutButtonDropDown() {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout();
    localStorage.clear();
  };
  return (
    <NavLink onClick={handleLogout} className="delaware-dropdown-button" data-cy="test-navBar-LogOut">
      <ExportOutlined onClick={handleLogout} style={{ fontSize: '250%' }} />
      &nbsp;Log&nbsp;out
    </NavLink>
  );
}
