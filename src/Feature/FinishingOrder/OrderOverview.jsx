import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'antd';
// import { NavLink } from 'react-router-dom';

import useCustomerApi from '../../api/customerService';

export default function OrderOverview({
  cart, context,
}) {
  const { productsFromContext } = useContext(context);

  const [cost, setCost] = useState(0);

  const customerService = useCustomerApi();

  useEffect(() => {
    let total = [];

    total = cart.map((e) => productsFromContext.find((p) => p.productId === e.product_id).amount * e.price);

    const totalCost = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    setCost(totalCost);
  }, [cart]);

  const onFinish = async () => {
    try {
      const request = await customerService.placeOrder({
        delivery_country: 'test',
        delivery_city: 'test',
        delivery_postal_code: 1,
        delivery_street: 'test',
        delivery_house_number: 1,
        delivery_box: 'test', // ingeven
        CARRIER_carrier_id: 1, // kiezen
        PACKAGING_packaging_id: 1, // kiezen
        SUPPLIER_supplier_id: 1, // kiezen
        order_lines: productsFromContext,
      });
      console.log(request);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <Card
      title="Overview"
      bordered
      actions={[
        // eslint-disable-next-line react/button-has-type
        <Button onClick={onFinish}>
          Finish order
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
