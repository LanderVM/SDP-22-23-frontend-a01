import {
  Col, Row,
} from 'antd';
import { NavLink } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import AddressInfo from '../../Components/order-details/address-info';
import useOrderApi from '../../api/orderService';
import PackagingInfo from '../../Components/order-details/packaging-info';

const size0 = 0;

export default function SingleOrderDetails({ order }) {
  if (!order) return null;
  const [totalCost, setTotalCost] = useState(0);
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '36px' : '24px';
  const fontSizeDesc = lg ? '24px' : '18px';
  const fontSizeMini = lg ? '18px' : '14px';
  const positionChangePackageMF = lg ? 'absolute' : 'relative';

  const orderApi = useOrderApi();
  const updateAddressFunction = async (orderId, shippingDetails) => orderApi.updateShippingDetailsById(orderId, shippingDetails);
  const updatePackagingFunction = async (orderId, packagingId) => orderApi.updateShippingDetailsById(orderId, { PACKAGING_packaging_id: packagingId });

  useMemo(() => {
    const calculateTotalCost = () => {
      const calculatedCost = order.product_list.map((product) => product.product_count * product.original_acquisition_price).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      setTotalCost(calculatedCost);
    };
    calculateTotalCost();
  }, []);

  return (
    <>
      <Row>
        <h1 style={{ fontSize: fontSizeName }}>Order details</h1>
      </Row>
      <Row style={{ fontSize: fontSizeDesc }}>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <h1 style={{ fontSize: fontSizeDesc }}>Delivery address</h1>
          <div style={{ fontSize: fontSizeMini }}>
            <AddressInfo orderDetails={order.order_info} updateFunction={updateAddressFunction} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <PackagingInfo orderDetails={order.order_info} updateFunction={updatePackagingFunction} />
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
