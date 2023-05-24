import {
  Col, Row,
} from 'antd';
import React from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import AddressInfo from '../../../Components/order-details/address-info';
import PackagingInfo from '../../../Components/order-details/packaging-info';

export default function OrderDetails({
  customerDetails, setAddressList, setPackaging,
}) {
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '36px' : '24px';
  const fontSizeDesc = lg ? '24px' : '18px';

  return (
    <>
      <h1 style={{ fontSize: fontSizeName }}>Order details</h1>
      <Row style={{ fontSize: fontSizeDesc }}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <AddressInfo updatedOrderDetailsFunction={setAddressList} orderDetails={customerDetails} />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <PackagingInfo orderDetails={customerDetails} updatedOrderDetailsFunction={setPackaging} />
        </Col>
      </Row>

    </>
  );
}
