import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { ExportOutlined } from '@ant-design/icons';

export default function LogoutButtonDropDown() {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout();
    localStorage.clear();
  };
  return (
    <div className="d-flex align-items-center">
      <ExportOutlined onClick={handleLogout} style={{ fontSize: '250%' }} />
      &nbsp;Log&nbsp;out
    </div>
  );
}
