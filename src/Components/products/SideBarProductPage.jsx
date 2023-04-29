import {
  Collapse, Checkbox, Switch, Space, InputNumber, Col, Row, Button,
} from 'antd';
import { CheckOutlined, CloseOutlined, RightOutlined } from '@ant-design/icons';

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
        padding: '15px 30px', borderRadius: '10px',
      }}
    >
      {handleCallback({ priceStart, priceEnd, inStock })}

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
          <Row>
            <Col>
              <InputNumber value={priceStart} formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} defaultValue={priceStart} min={minPrice} max={maxPrice} onChange={(newPrice) => setPriceStart(newPrice)} />
            </Col>
            <Col>
              &nbsp; - &nbsp;
            </Col>
            <Col>
              <InputNumber value={priceEnd} formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} defaultValue={priceEnd} min={minPrice} max={maxPrice} onChange={(newPrice) => setPriceEnd(newPrice)} />
            </Col>
            <Button
              type="primary"
              icon={<RightOutlined />}
            />
          </Row>
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
