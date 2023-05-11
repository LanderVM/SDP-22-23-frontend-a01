import {
  Col, Row,
} from 'antd';
import React from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

// import ChangeAddressModal from './ChangeAddressModal';
// import ChangePackagingModal from './ChangePackagingModal';
// import getStatusAsString from '../../utils';

import { ChangeAddressModalMemo } from './ChangeAddressModal';
import { ChangePackagingModalMemo } from './ChangePackagingModal';

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
          <h1>Delivery address</h1>
          <ChangeAddressModalMemo setAddressList={setAddressList} customerDetails={customerDetails} />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <h1>Packaging</h1>
          <ChangePackagingModalMemo setPackaging={setPackaging} />
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 4 }}>
          <h1>Estimated delivery</h1>
        </Col>
      </Row>

    </>
  );
}
