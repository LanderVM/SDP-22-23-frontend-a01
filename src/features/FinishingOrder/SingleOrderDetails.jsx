import {
  Col, Row,
} from 'antd';
import React from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import AddressInfo from '../../Components/order-details/address-info';
import PackagingInfo from '../../Components/order-details/packaging-info';

export default function OrderDetails({
  customerDetails, setAddressList, setPackaging,
}) {
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '36px' : '24px';
  const fontSizeDesc = lg ? '24px' : '18px';

  return (
    <>
      <Row>
        <h1 style={{ fontSize: fontSizeName }}>Order details</h1>
      </Row>
      <Row style={{ fontSize: fontSizeDesc }}>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <AddressInfo updatedOrderDetailsFunction={setAddressList} orderDetails={customerDetails} />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <PackagingInfo orderDetails={customerDetails} updatedOrderDetailsFunction={setPackaging} />
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 4 }}>
          <h1>Estimated delivery</h1>
        </Col>
      </Row>

    </>
  );
}
