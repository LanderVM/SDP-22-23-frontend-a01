import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import './ShoppingCart.css';

export default function ShoppingCartOverview({
  cart,
}) {
  const [cost, setCost] = useState(0);
  useEffect(() => {
    const totalCost = cart.map((e) => e.price).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    setCost(totalCost);
  });

  return (

    <Card
      title="Overview"
      bordered
      style={{ width: 300 }}
      actions={[
        // eslint-disable-next-line react/button-has-type
        <Button type="primary">
          Continue to payment
        </Button>,
      ]}
    >
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td>
              Articles (
              {cart.length}
              ):

            </td>
            <td id="priceTd">
              <strong>
                €&nbsp;
                {cost}
              </strong>
            </td>
          </tr>
          <tr id="trShipping">
            <td>Shipping Costs:</td>
            <td id="priceTd">
              <strong>
                €&nbsp;20
              </strong>
            </td>
          </tr>
          &nbsp;
          <tr>
            <td>Subtotal:</td>
            <td id="priceTd">
              <strong>
                €&nbsp;
                {20 + cost}
              </strong>

            </td>
          </tr>

        </tbody>
      </table>
    </Card>
  );
}
