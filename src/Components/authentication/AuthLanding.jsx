import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { Col, Row } from 'antd';
import Error from '../error';
import LoginButton from './LoginButton';
import './authLanding.css';

export default function AuthLanding() {
  const { error, isAuthenticated, isLoading } = useAuth0();

  if (error) {
    return (
      <Content>
        <Row align="middle" justify="center">
          <Col type="flex" align="middle">
            <h1>Login failed</h1>
            <p>
              Sorry, we were unable to sign you in, the error below might be useful.
            </p>
            <Error error={error} />
            <LoginButton iconColor="black" />
          </Col>
        </Row>
      </Content>
    );
  }

  if (!isLoading && isAuthenticated) return <Navigate to="/" />;

  if (!isLoading && !isAuthenticated) {
    return (
      <Content className="min-height">
        <Row align="middle" justify="center">
          <Col type="flex" align="middle">
            <h1>Login required</h1>
            <p>You need to login to access this page.</p>
            <LoginButton iconColor="black" />
          </Col>
        </Row>
      </Content>
    );
  }

  return (
    <Content>
      <Row align="middle" justify="center">
        <Col type="flex" align="middle">
          <h1>Signing in</h1>
          <p>
            Please wait while we sign you in!
          </p>
        </Col>
      </Row>
    </Content>
  );
}
