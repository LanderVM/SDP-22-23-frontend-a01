import {
  Col, Row, Breadcrumb, Layout,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import useProfile from '../../api/profile';
import CompanyInfo from './CompanyInfo';
import Colleagues from './Colleagues';
import Loader from '../Loader';
import Error from '../Error';
import SideMenu from '../Sider/SideMenu';
import RequireAuth from '../authentication/RequireAuth';

export default function ProfileOverview() {
  const profileApi = useProfile();

  const [companyInfo, setCompanyInfo] = useState({});
  const [colleagues, setColleagues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <RequireAuth>
      <Content style={{ padding: '0 32px' }}>
        <Breadcrumb style={{ marginTop: '16px' }} items={[{ title: 'Account' }, { title: 'Company Info' }]} />
        <Layout>
          <SideMenu selectedKey={['profile']} />
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
    </RequireAuth>
  );
}
