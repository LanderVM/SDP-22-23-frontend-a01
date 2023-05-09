import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';

export default function OrderOverview({
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
        <NavLink to="/">
          Finish order
        </NavLink>,
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
