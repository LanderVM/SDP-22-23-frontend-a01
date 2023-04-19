import React from 'react';

const welcomeTextStyle = {
  margin: '5%',
  padding: '5px',
  borderStyle: 'solid',
  borderWidth: 'medium',
  borderColor: 'red',
  fontSize: '2em',
};

export default function HomeWelcome() {
  return (
    <div style={welcomeTextStyle}>
      Welcome to our home page! This is the homepage of our webpage where you can
      access all functionalities necessary for buying goods by other vendors. Feel free to click one
      of the underlying functions: 1. consulting products, 2. consulting profile,
      3. track & trace an order, 4. consult an order, 5. consult notifications, 6. make an order.
      Warning: for most functionalities, you need to be logged in!
    </div>
  );
}
