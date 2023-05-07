import {
  Col, Grid, Row,
} from 'antd';
import { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import useProfile from '../../api/profile';
// import { mockdata } from './mockdata';
import CompanyInfo from './CompanyInfo';
import SidewayNavigation from './SidewayNavigation';
import Colleagues from './Colleagues';
import Loader from '../Loader';
import Error from '../Error';

const { useBreakpoint } = Grid;

export default function ProfileOverview() {
  const profileApi = useProfile();

  const [companyInfo, setCompanyInfo] = useState({});
  const [colleagues, setColleagues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const { isAuthenticated } = useAuth0();

  const { lg } = useBreakpoint();

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

  const phoneFormatProfileOverview = lg ? '19' : '24';

  return (
    <>
      <Loader loading={loading} />
      <Error error={error} />
      <Row>
        {
          lg ? (
            <Col span={5} style={{ color: 'black' }}>
              <SidewayNavigation />
            </Col>
          ) : null
        }
        <Col span={phoneFormatProfileOverview}>
          <Row>
            <Col span={24}>
              <CompanyInfo companyInformation={companyInfo} />
            </Col>
            <Col span={24} style={{ marginTop: '2%' }}>
              <Colleagues colleagues={colleagues} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
