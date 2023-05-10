import {
  Col, Row,
} from 'antd';
import { NavLink } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import ChangeAddressModal from './ChangeAddressModal';
import ChangePackagingModal from './ChangePackagingModal';
import getStatusAsString from '../../utils';

const size0 = 0;

export default function SingleOrderDetails({ order }) {
  if (!order) return null;
  const [totalCost, setTotalCost] = useState(0);
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '36px' : '24px';
  const fontSizeDesc = lg ? '24px' : '18px';
  const fontSizeMini = lg ? '18px' : '14px';
  const positionChangePackageMF = lg ? 'absolute' : 'relative';

  useMemo(() => {
    const calculateTotalCost = () => {
      const calculatedCost = order.product_list.map((product) => product.product_count * product.original_acquisition_price).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      setTotalCost(calculatedCost);
    };
    calculateTotalCost();
  }, [order]);

  return (
    <>
      <Row>
        <h1 style={{ fontSize: fontSizeName }}>Order details</h1>
      </Row>
      <Row style={{ fontSize: fontSizeDesc }}>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <h1 style={{ fontSize: fontSizeDesc }}>Delivery adress</h1>
          <div style={{ fontSize: fontSizeMini }}>
            <div>
              {order.order_info.delivery_street}
                    &nbsp;
              {order.order_info.delivery_house_number}
            </div>
            <div>
              {order.order_info.delivery_postal_code}
                    &nbsp;
              {order.order_info.delivery_city}
            </div>
            <div>
              {order.order_info.delivery_country}
            </div>
            {getStatusAsString(order.order_info.order_status).toLowerCase() === 'posted' ? <ChangeAddressModal /> : null}

          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h1 style={{ fontSize: fontSizeDesc }}>Packaging</h1>
          <div style={{ fontSize: fontSizeMini }}>{order.order_info.name}</div>
          {getStatusAsString(order.order_info.order_status).toLowerCase() === 'posted' ? <ChangePackagingModal /> : null}

        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 4 }}>
          <h1 style={{ fontSize: fontSizeDesc }}>Total amount: </h1>
          <NavLink
            to="/track"
            style={{
              position: positionChangePackageMF, bottom: size0, height: '26px', fontSize: fontSizeMini, color: '#1677ff',
            }}
          >
            &#62;&nbsp;Track order
          </NavLink>
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <h1 style={{ fontSize: fontSizeDesc }}>
            €&nbsp;
            {totalCost}
          </h1>
        </Col>
      </Row>
    </>
  );
}
