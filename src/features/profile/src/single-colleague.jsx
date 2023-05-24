import { Col, Grid, Row } from 'antd';

const { useBreakpoint } = Grid;

export default function SingleColleague({ colleague }) {
  const { lg } = useBreakpoint();

  const phoneFormatColleagueInfoImg = lg ? '6' : '24';
  const phoneFormatColleagueInfoCredentials = lg ? '18' : '24';

  return (
    <Row data-cy="colleagueInfo">
      <Col span={phoneFormatColleagueInfoImg}>
        <img src={colleague.image_URL} alt="" style={{ maxWidth: '40%' }} />
      </Col>
      <Col span={phoneFormatColleagueInfoCredentials}>
        <p data-cy="colleagueUsername">
          {colleague.username}
        </p>
        <p data-cy="colleagueEmail">
          {colleague.email}
        </p>
      </Col>
    </Row>
  );
}
