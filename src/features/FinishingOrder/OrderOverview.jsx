import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'antd';
// import { NavLink } from 'react-router-dom';

export default function OrderOverview({
  cart, context, onOrder,
}) {
  const { productsFromContext } = useContext(context);

  const [cost, setCost] = useState(0);

  useEffect(() => {
    let total = [];

    total = cart.map((e) => productsFromContext.find((p) => p.productId === e.product_id).amount * e.price);

    const totalCost = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    setCost(totalCost);
  }, [cart]);

  return (
    <Card
      title="Overview"
      bordered
      actions={[
        // eslint-disable-next-line react/button-has-type
        <Button onClick={onOrder} style={{ backgroundColor: '#ff4d4f', color: 'white' }}>
          Place order
        </Button>,
      ]}
    >
      <table style={{ width: '100%' }}>
        <tbody>
          <tr style={{ marginBottom: '0px', paddingBottom: '0px' }}>
            <td>
              Articles (
              {productsFromContext.map((e) => e.amount).reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
              )}
              ):

            </td>
            <td id="priceTd">
              <strong>
                €&nbsp;
                {(cost - cost * 0.21).toFixed(2)}
              </strong>
            </td>
          </tr>
          <tr style={{ marginTop: '0px', paddingTop: '0px' }}>
            <td style={{ fontSize: '10px', color: 'grey' }}>
              Excluding VAT
            </td>
          </tr>
          <tr>
            <td>
              VAT
            </td>
            <td id="priceTd">
              <strong>
                €&nbsp;
                {(cost * 0.21).toFixed(2)}
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
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td>Total:</td>
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
