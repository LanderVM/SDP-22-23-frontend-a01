import {
  Collapse, Checkbox, Switch, Space, Slider, InputNumber, Col, Row,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import React, { useState } from 'react';

import './Sidebar.css';

const minPrice = 0;
const maxPrice = 100;

export default function SideBarProductPage(props) {
  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(50);
  const [inStock, setInStock] = useState(true);

  const { handleCallback } = props;
  const { Panel } = Collapse;

  return (
    <div
      style={{
        backgroundColor: '#EC4848', padding: '15px 30px', borderRadius: '10px', color: 'white',
      }}
    >
      {handleCallback({ priceStart, priceEnd, inStock })}
      <h1>Products</h1>

      <Collapse bordered={false} defaultActiveKey={['1']} className="sideBar">
        <Panel header="Product Category" key="1">
          <Checkbox>Product Category 1</Checkbox>
          <br />
          <Checkbox>Product Category 2</Checkbox>
          <br />
          <Checkbox>Product Category 3</Checkbox>
          <br />
          <Checkbox>Product Category 4</Checkbox>
        </Panel>
        <Panel header="Price" key="2" data-cy="test-products-filter-priceTab">
          <p>
            €
            {' '}
            {priceStart}
            {' '}
            - €
            {' '}
            {priceEnd}
          </p>
          <Row>
            <Col>
              <InputNumber value={priceStart} defaultValue={priceStart} min={minPrice} max={maxPrice} onChange={(newPrice) => setPriceStart(newPrice)} />
            </Col>
            <Col>
              &nbsp; - &nbsp;
            </Col>
            <Col>
              <InputNumber value={priceEnd} defaultValue={priceEnd} min={minPrice} max={maxPrice} onChange={(newPrice) => setPriceEnd(newPrice)} />
            </Col>
          </Row>
          <Slider range min={minPrice} max={maxPrice} value={[priceStart, priceEnd]} defaultValue={[priceStart, priceEnd]} name="priceRange" id="priceRange" onAfterChange={(newPrice) => { setPriceStart(newPrice[0]); setPriceEnd(newPrice[1]); }} data-cy="test-products-filter-price" />
        </Panel>
        <Panel header="Brand" key="3">
          <Checkbox>Brand 1</Checkbox>
          <br />
          <Checkbox>Brand 2</Checkbox>
        </Panel>

        <Panel header="Availability" key="4" data-cy="test-products-filter-inStockTab">
          <Space>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
              onClick={() => setInStock(!inStock)}
              data-cy="test-products-filter-inStock"
              style={{ backgroundColor: '#1677ff' }}
            />
            <span>Only show in stock</span>
          </Space>
        </Panel>
      </Collapse>

    </div>
  );
}
