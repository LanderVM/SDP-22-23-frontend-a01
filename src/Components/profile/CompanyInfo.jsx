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
          <p>
            {companyInformation.supplier_delivery_street}
            &nbsp;
            {companyInformation.supplier_delivery_house_number}
            &nbsp;
            {companyInformation.supplier_delivery_box}
            <br />
            {companyInformation.supplier_delivery_postal_code}
            &nbsp;
            {companyInformation.supplier_delivery_city}
            <br />
            {companyInformation.supplier_delivery_country}
          </p>
        </Col>
        <Col span={phoneFormatCard}>
          <img src={companyInformation.logo_URL} alt="" style={{ maxWidth: '45%' }} />
        </Col>
      </Row>
    </Card>
  );
}
