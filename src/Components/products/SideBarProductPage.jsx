import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import React, { useState } from 'react';

export default function SideBarProductPage(props) {
  const [price, setPrice] = useState(50);
  const [inStock, setInStock] = useState(false);

  const { handleCallback } = props;

  return (
    <div
      className="w3-sidebar w3-bar-block"
      style={{
        backgroundColor: '#EC4848', padding: '15px', borderRadius: '10px', color: 'white',
      }}
    >
      {handleCallback({ price, inStock })}
      <h1>Products</h1>
      <Accordion defaultActiveKey={['0']} alwaysOpen style={{ borderColor: 'rgba(0,0,0,.125)' }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Product Category</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Check
                type="checkbox"
                id="custom-checkbox"
                label="Product category 1"
              />
              <Form.Check
                type="checkbox"
                label="Product category 2"
                id="custom-checkbox2"
              />
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <p>
              € 1 - €
              {' '}
              {price}
            </p>
            <input type="range" min={1} value={price} max={100} name="priceRange" id="priceRange" onChange={(newPrice) => { setPrice(newPrice.target.value); }} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Brand</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Check
                type="checkbox"
                id="custom-checkbox"
                label="Brand 1"
              />
              <Form.Check
                type="checkbox"
                label="Brand 2"
                id="custom-checkbox2"
              />
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Availability</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Only show in stock"
                value={inStock}
                onClick={() => setInStock(!inStock)}
              />
            </Form>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}
