import React, { useContext } from 'react';
import {
  Col, Grid, Row,
} from 'antd';

const { useBreakpoint } = Grid;
export default function OrderContent({
  cart, context,
}) {
  const { productsFromContext } = useContext(context);
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '24px' : '12px';
  const fontSizeDesc = lg ? '18px' : '8px';

  const product = productsFromContext.filter((e) => e.productId === cart.product_id);
  const productAmount = product.map((el) => el.amount);

  return (
    <Row gutter={{
      xs: 8, sm: 16, md: 24, lg: 32,
    }}
    >
      <Col>
        <img src={cart.image_URL} alt="product" width="100px" />
      </Col>
      <Col style={{ flex: '1 0 50%' }}>
        <div style={{ fontSize: fontSizeName }} data-cy="cartName"><b>{cart.name}</b></div>
        <div style={{ fontSize: fontSizeDesc }} data-cy="cartDescription">{cart.description}</div>
        <div>
          {productAmount}
          {' '}
          x €&nbsp;
          {cart.price}
        </div>
      </Col>
      <Col style={{ textAlign: 'right', justifyContent: 'right', flex: '1 0 25%' }}>
        <div data-cy="cartPrice" style={{ fontSize: fontSizeName }}>
          €&nbsp;
          {cart.price * productAmount }
        </div>
      </Col>
    </Row>

  );
}
