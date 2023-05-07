import {
  Col, Grid, Row,
} from 'antd';
import { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import useProfile from '../../api/profile';
import { mockdata } from './mockdata';
import CompanyInfo from './CompanyInfo';
import SidewayNavigation from './SidewayNavigation';
import Colleagues from './Colleagues';

const { useBreakpoint } = Grid;

export default function ProfileOverview() {
  const profileApi = useProfile();

  const [companyInfo, setCompanyInfo] = useState({});
  const [colleagues, setColleagues] = useState([]);

  // const { isAuthenticated } = useAuth0();

  const { lg } = useBreakpoint();

  useEffect(() => {
    setColleagues(mockdata.items);
    console.log(colleagues);
  }, []);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      const data = await profileApi.getCompanyInfo();
      setCompanyInfo(data);
    };
    fetchCompanyInfo();
    console.log(companyInfo);
    // console.log(companyInfo.user_email);
  }, []);
  /*
  useEffect(() => {
    const fecthColleagues = async () => {
      const data = await profileApi.getAllCollegues();
      setColleagues(data);
    };
    fecthColleagues();
    console.log(`onbelangerijk: ${colleagues}`);
  }, []); */

  const phoneFormatProfileOverview = lg ? '19' : '24';

  return (
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
  );
}
