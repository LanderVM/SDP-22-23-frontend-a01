import { Col, Row } from 'antd';

export default function ColleagueInfo({ colleague }) {
  return (
    <Row>
      <Col span={6}>
        <img src={colleague.image_URL} alt="" />
      </Col>
      <Col span={18}>
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
