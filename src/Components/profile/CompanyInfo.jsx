import {
  Col, Row, Card, Grid,
} from 'antd';

const { useBreakpoint } = Grid;

export default function CompanyInfo({ companyInformation }) {
  const { lg } = useBreakpoint();

  const phoneFormatCard = lg ? '12' : '24';

  return (
    <Card title="Company information">
      <Row>
        <Col span={phoneFormatCard}>
          <p>{companyInformation.supplier_name}</p>
          <p>{companyInformation.user_email}</p>
          <p>{companyInformation.supplier_phone_number}</p>
          <p>{companyInformation.supplier_phone_number}</p>
        </Col>
        <Col span={phoneFormatCard}>
          <Row>
            <Col span={8}>
              <p>Logo:</p>
            </Col>
            <Col span={12}>
              <img src={companyInformation.logo_URL} alt="" style={{ maxWidth: '50%' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
