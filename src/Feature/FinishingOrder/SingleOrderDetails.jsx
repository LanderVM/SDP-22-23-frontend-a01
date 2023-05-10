import {
  Col, Row,
} from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

// import ChangeAddressModal from './ChangeAddressModal';
// import ChangePackagingModal from './ChangePackagingModal';
// import getStatusAsString from '../../utils';

import { ChangeAddressModalMemo } from './ChangeAddressModal';

const size0 = 0;

export default function OrderDetails({ customerDetails, setAddressList }) {
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '36px' : '24px';
  const fontSizeDesc = lg ? '24px' : '18px';
  const fontSizeMini = lg ? '18px' : '14px';
  const positionChangePackageMF = lg ? 'absolute' : 'relative';

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
        <Col xs={{ span: 12 }} lg={{ span: 4 }}>
          <NavLink
            to="/track"
            style={{
              position: positionChangePackageMF, bottom: size0, height: '26px', fontSize: fontSizeMini, color: '#1677ff',
            }}
          >
            &#62;&nbsp;Track order
          </NavLink>
        </Col>
      </Row>

    </>
  );
}
