import { useAuth0 } from '@auth0/auth0-react';
import Nav from 'react-bootstrap/Nav';
import { MdLogout } from 'react-icons/md';
import React from 'react';
import { ExportOutlined } from '@ant-design/icons';

export function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Nav.Link
      type="button"
      className="d-flex align-items-center"
      onClick={logout}
      data-cy="test-navBar-LogOut"
    >
      <MdLogout size={60} className="me-1" />
      Log&nbsp;out
    </Nav.Link>
  );
}

export function LogoutButtonDropDown() {
  const { logout } = useAuth0();

  return (
    <div className="d-flex align-items-center">
      <ExportOutlined onClick={logout} style={{ fontSize: '250%' }} />
      &nbsp;Log&nbsp;out
    </div>
  );
}
