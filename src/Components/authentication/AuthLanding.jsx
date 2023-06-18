import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import {
  Result,
} from 'antd';
import React from 'react';
import Error from '../error';
import LoginButton from './LoginButton';
import './authLanding.css';

export default function AuthLanding() {
  const { error, isAuthenticated, isLoading } = useAuth0();

  if (error) {
    return (
      <Content className="min-height">
        <Result
          status="500"
          title="Authentication Failure"
          subTitle="Sorry, we were unable to sign you in, the error below might be useful."
          extra={(
            <>
              {' '}
              <Error error={error} />
              <LoginButton iconColor="black" />
            </>
            )}
        />
      </Content>
    );
  }

  if (!isLoading && isAuthenticated) return <Navigate to="/" />;

  if (!isLoading && !isAuthenticated) {
    return (
      <Content className="min-height">
        <Result
          status="403"
          title="Login Required"
          subTitle="You need to log in to access this feature."
          extra={(
            <LoginButton iconColor="black" />
)}
        />
      </Content>
    );
  }

  return (
    <Content className="min-height">
      <Result
        status="success"
        title="Signing in.."
        subTitle="Please wait while we sign you in!"
      />
    </Content>
  );
}
