import {
  Col, Row, Card,
} from 'antd';

export default function CompanyInfo() {
  return (
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
  );
}
