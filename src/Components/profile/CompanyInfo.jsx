import {
  Col, Row, Card, Grid,
} from 'antd';

const { useBreakpoint } = Grid;

export default function CompanyInfo({ companyInformation }) {
  const { lg } = useBreakpoint();

  const phoneFormatCard = lg ? '12' : '24';

  const addressPart1 = companyInformation.supplier_delivery_street.concat(' ').concat((companyInformation.supplier_delivery_house_number).toString()).concat(' ').concat(companyInformation.supplier_delivery_box);

  const addressPart2 = (companyInformation.supplier_delivery_postal_code).toString().concat(' ').concat(companyInformation.supplier_delivery_city);

  const addressPart3 = companyInformation.supplier_delivery_country;

  return (
    <Card title="Company information">
      <Row>
        <Col span={phoneFormatCard}>
          <p>{companyInformation.supplier_name}</p>
          <p>{companyInformation.user_email}</p>
          <p>{companyInformation.supplier_phone_number}</p>
          <p>
            {addressPart1}
            <br />
            {addressPart2}
            <br />
            {addressPart3}
          </p>
        </Col>
        <Col span={phoneFormatCard}>
          <img src={companyInformation.logo_URL} alt="" style={{ maxWidth: '45%' }} />
        </Col>
      </Row>
    </Card>
  );
}
