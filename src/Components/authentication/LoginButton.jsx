import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { ImportOutlined } from '@ant-design/icons';

export default function LoginButtonDropDown({ iconColor }) {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = useCallback(
    async () => {
      await loginWithRedirect();
    },
    [loginWithRedirect],
  );

  return (
    <button type="button" data-cy="test-navbar-login" style={{ all: 'unset' }}>
      <ImportOutlined
        style={{
          fontSize: '250%', color: iconColor || 'white',
        }}
        size={35}
        onClick={handleLogin}
      />
    </button>
  );
}
