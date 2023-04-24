import React, { useEffect, useState } from 'react';

const buttonStyle = {
  borderRadius: '8px',
  backgroundColor: '#d4403b',
  margin: '5px',
  maxWidth: '90%',
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
    <div className="container" style={{ border: '1px solid black' }}>
      <h1> Overview</h1>
      <div>
        <p style={{ textAlign: 'left' }}>
          Articles
          {cart.size}

        </p>
        <p style={{ textAlign: 'right' }}>
          €
          {cost}
        </p>
      </div>
      <div>
        <p style={{ textAlign: 'left' }}>shipping costs: </p>
        <p style={{ textAlign: 'right' }}>
          €
          20
        </p>
      </div>
      <div>
        <p>Subtotal: </p>
        <p>
          €
          {20 + cost}
        </p>
      </div>
      <div />
      <div style={{ borderTop: '2px solid black' }}>

        {/* eslint-disable-next-line react/button-has-type */}
        <button style={buttonStyle}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
