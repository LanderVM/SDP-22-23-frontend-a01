import React, { useContext, useEffect, useState } from 'react';
import {
  Card, Divider, Button, Row, Col,
} from 'antd';
import { NavLink } from 'react-router-dom';

export default function SideOverview({
  cart, context,
}) {
  const { productsFromContext } = useContext(context);

  const [cost, setCost] = useState(0);

  useEffect(() => {
    const total = cart.map((e) => productsFromContext.find((p) => p.productId === e.product_id).amount * e.price);
    const totalCost = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    setCost(totalCost);
  });

  return (
    <Card
      title="Overview"
      bordered
      actions={[
        <Button style={{ backgroundColor: '#ff4d4f' }} data-cy="proceedToCheckoutBtn">
          <NavLink to="/checkout" style={{ color: 'white' }}>
            <b>Proceed to checkout</b>
          </NavLink>
        </Button>,
      ]}
    >
      <Row>
        <Col span={24}>
          <span>
            Articles (
            {productsFromContext.map((e) => e.amount).reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0,
            )}
            ):

          </span>
          <span id="priceTd">
            <strong>
              €&nbsp;
              {cost}
            </strong>
          </span>
        </Col>
      </Row>
      <Row>
        <Col span={24}><Divider style={{ borderTop: '1px solid white' }} /></Col>

      </Row>
      <Row>
        <Col span={24}>
          <span>
            Subtotal:
          </span>
          <span id="priceTd">
            <strong>
              €&nbsp;
              {cost}
            </strong>
          </span>

        </Col>

      </Row>
      <Row>
        <Col span={24}>
          <span style={{ fontSize: '10px' }}>
            (Excl. shipping costs)
          </span>

        </Col>

      </Row>
    </Card>
  );
}
