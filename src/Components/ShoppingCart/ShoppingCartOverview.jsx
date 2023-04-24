import React, { useEffect, useState } from 'react';
import { Card } from 'antd';

const buttonStyle = {
  border: '2px solid white',
  backgroundColor: '#d4403b',
  margin: '5px',
  maxWidth: '90%',
  color: 'white',
};

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
        <button style={buttonStyle}>
          Proceed to checkout
        </button>,
      ]}
    >
      <p style={{ textAlign: 'left' }}>
        Articles
        {cart.size}

      </p>
      <p style={{ textAlign: 'right' }}>
        €
        {cost}
      </p>
      <p style={{ textAlign: 'left' }}>shipping costs: </p>
      <p style={{ textAlign: 'right' }}>
        €
        20
      </p>
      <p>Subtotal: </p>
      <p>
        €
        {20 + cost}
      </p>
    </Card>
  );
}
