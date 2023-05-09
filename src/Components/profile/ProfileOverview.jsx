import {
  Col, Row, Breadcrumb, Layout,
} from 'antd';
import React, { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import { Content } from 'antd/es/layout/layout';
import useProfile from '../../api/profile';
// import { mockdata } from './mockdata';
import CompanyInfo from './CompanyInfo';
// import SidewayNavigation from './SidewayNavigation';
import Colleagues from './Colleagues';
import Loader from '../Loader';
import Error from '../Error';
import SideMenu from '../Sider/SideMenu';

// const { useBreakpoint } = Grid;

export default function ProfileOverview() {
  const profileApi = useProfile();

  const [companyInfo, setCompanyInfo] = useState({});
  const [colleagues, setColleagues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const { isAuthenticated } = useAuth0();

  // const { lg } = useBreakpoint();

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await profileApi.getCompanyInfo();
        setCompanyInfo(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    const fecthColleagues = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await profileApi.getAllCollegues();
        setColleagues(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fecthColleagues();
  }, []);

  // onst phoneFormatProfileOverview = lg ? '19' : '24';

  return (
    <div className="a">
      <Content style={{ padding: '0 32px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item>Company Info</Breadcrumb.Item>
        </Breadcrumb>
        <Layout>
          <SideMenu />
          <Content style={{
            margin: '0 14px',
          }}
          >
            <Loader loading={loading} />
            <Error error={error} />
            {!loading && !error ? (
              <Row>
                <Col span={24}>
                  <CompanyInfo companyInformation={companyInfo} />
                </Col>
                <Col span={24} style={{ marginTop: '2%' }}>
                  <Colleagues colleagues={colleagues} />
                </Col>
              </Row>
            ) : null}
          </Content>
        </Layout>
      </Content>
    </div>
  );
}
