import {
  Col, Row, Card, Grid,
} from 'antd';

const { useBreakpoint } = Grid;

export default function CompanyInfo() {
  const { lg } = useBreakpoint();

  const phoneFormatCard = lg ? '12' : '24';

  return (
    <Card title="Company information">
      <Row>
        <Col span={phoneFormatCard}>
          <p>Name: Tim CO</p>
          <p>Email: sales@timCo.com</p>
          <p>Phone number: 0455667788</p>
          <p>Delivery address: Merestraat 44 C Aalst Belgium</p>
        </Col>
        <Col span={phoneFormatCard}>
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
