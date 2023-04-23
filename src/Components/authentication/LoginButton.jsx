import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { MdLogin } from 'react-icons/md';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ImportOutlined } from '@ant-design/icons';

export function LoginButton({
  bootstrapTextStyling, asClass, iconSize, bootStrapIconStyling,
}) {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = useCallback(
    async () => {
      await loginWithRedirect();
    },
    [loginWithRedirect],
  );

  return (
    <Nav.Link
      type="button"
      className="d-flex align-items-center"
      onClick={handleLogin}
    >
      <MdLogin size={iconSize} className={bootStrapIconStyling} />
      <Navbar.Text className={bootstrapTextStyling} as={asClass}>
        Log&nbsp;in
      </Navbar.Text>
    </Nav.Link>
  );
}

export function LoginButtonDropDown() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = useCallback(
    async () => {
      await loginWithRedirect();
    },
    [loginWithRedirect],
  );

  return (
    <ImportOutlined style={{ fontSize: '250%' }} onClick={handleLogin} />
  );
}
