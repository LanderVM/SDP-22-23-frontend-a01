import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { ImportOutlined } from '@ant-design/icons';

export default function LoginButtonDropDown() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = useCallback(
    async () => {
      await loginWithRedirect();
    },
    [loginWithRedirect],
  );

  return (
    <ImportOutlined style={{ fontSize: '250%', color: 'white' }} onClick={handleLogin} data-cy="test-navbar-login" />
  );
}
