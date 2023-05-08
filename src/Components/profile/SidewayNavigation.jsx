import {
  Col, Row,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons';

export default function SidewayNavigation() {
  return (
    <Row>
      <Col span={24}>
        <p>
          Account /
          <span style={{ fontWeight: 'bold' }}>
            Company profile
          </span>
        </p>
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
  );
}
