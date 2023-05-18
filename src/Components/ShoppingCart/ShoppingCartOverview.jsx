import React, { useContext, useEffect, useState } from 'react';
import { Card, Divider, Button } from 'antd';
import './ShoppingCart.css';
import { NavLink } from 'react-router-dom';

export default function ShoppingCartOverview({
  cart, context,
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
        <Button style={{ backgroundColor: '#ff4d4f' }}>
          <NavLink to="/FinishingOrder" style={{ color: 'white' }}>
            <b>Proceed to checkout</b>
          </NavLink>
        </Button>,
      ]}
    >
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
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
                {cost}
              </strong>
            </td>
          </tr>
          <Divider style={{ borderTop: '1px solid white' }} />
          <tr>
            <td>
              Subtotal:
            </td>
            <td id="priceTd">
              <strong>
                €&nbsp;
                {20 + cost}
              </strong>
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: '10px' }}>
              (Excl. shipping costs)
            </td>

          </tr>

        </tbody>
      </table>
    </Card>
  );
}
