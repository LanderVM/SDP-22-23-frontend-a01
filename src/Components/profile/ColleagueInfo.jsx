import { Col, Grid, Row } from 'antd';

const { useBreakpoint } = Grid;

export default function ColleagueInfo({ colleague }) {
  const { lg } = useBreakpoint();

  const phoneFormatColleagueInfoImg = lg ? '6' : '24';
  const phoneFormatColleagueInfoCredentials = lg ? '18' : '24';

  return (
    <Row>
      <Col span={phoneFormatColleagueInfoImg}>
        <img src={colleague.image_URL} alt="" />
      </Col>
      <Col span={phoneFormatColleagueInfoCredentials}>
        <p>
          name:&nbsp;
          {colleague.username}
        </p>
        <p>
          email:&nbsp;
          {colleague.email}
        </p>
      </Col>
    </Row>
  );
}
