import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { MdLogin } from 'react-icons/md';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function LoginButton({
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
