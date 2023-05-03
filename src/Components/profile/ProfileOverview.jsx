import { Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons';

export default function ProfileOverview() {
  return (
    <Row>
      <Col span={4} style={{ color: 'black' }}>
        <Row>
          <Col span={24}>
            <p>Account &gt Company profile</p>
          </Col>
          <Col span={24}>
            <NavLink to="/profile">
              <p style={{ color: 'black' }}>
                <UserOutlined />
                Account overview
              </p>
            </NavLink>
          </Col>
          <Col span={24}>
            <NavLink to="">
              <p style={{ color: 'black' }}>
                <ShoppingOutlined />
                Orders
              </p>
            </NavLink>
          </Col>
        </Row>
      </Col>
      <Col span={20}>
        <Row>
          <Col span={24}>
            <Card title="Company information">
              <Row>
                <Col span={12}>
                  <p>Name: Tim CO</p>
                  <p>Email: sales@timCo.com</p>
                  <p>Phone number: 0455667788</p>
                  <p>Delivery address: Merestraat 44 C Aalst Belgium</p>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={8}>
                      <p>Logo:</p>
                    </Col>
                    <Col span={12}>
                      <img src="../../../public/images/Delaware-logo_black.png" alt="" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
