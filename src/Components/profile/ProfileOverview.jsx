import {
  Card, Col, Row,
} from 'antd';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import useProfile from '../../api/profile';

export default function ProfileOverview() {
  const profileApi = useProfile();

  const [companyInfo, setCompanyInfo] = useState({});

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchcompanyInfo = async () => {
      const data = await profileApi.getCompanyInfo();
      setCompanyInfo(data);
    };
    if (isAuthenticated) {
      fetchcompanyInfo();
    }
    console.log(companyInfo);
  }, [isAuthenticated]);

  return (
    <Row>
      <Col span={5} style={{ color: 'black' }}>
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
      </Col>
      <Col span={19}>
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
            <p>Company purchasers</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
