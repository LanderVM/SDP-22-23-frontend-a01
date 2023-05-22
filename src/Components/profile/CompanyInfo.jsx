import {
  Col, Row, Card, Grid,
} from 'antd';

const { useBreakpoint } = Grid;

export default function CompanyInfo({ companyInformation }) {
  const { lg } = useBreakpoint();

  const imgFormat = lg ? '180px' : '90px';

  return (
    <Card title="Company information" data-cy="companyInfo">
      <Row>
        <Col span={12}>
          <p data-cy="companyInfoSupplierName">{companyInformation.supplier_name}</p>
          <p data-cy="companyInfoSupplierEmail">{companyInformation.supplier_email}</p>
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
        <Col span={12}>
          <img src={companyInformation.logo_URL} alt="" style={{ maxWidth: imgFormat, maxHeight: imgFormat }} />
        </Col>
      </Row>
    </Card>
  );
}
