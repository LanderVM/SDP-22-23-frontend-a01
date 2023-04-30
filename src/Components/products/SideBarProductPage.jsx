import {
  Collapse, Checkbox, Switch, Space, InputNumber, Col, Row, Button,
} from 'antd';
import { CheckOutlined, CloseOutlined, RightOutlined } from '@ant-design/icons';

import React, { useState } from 'react';

import './Sidebar.css';

const minPrice = 0;
const maxPrice = 2000;

export default function SideBarProductPage(props) {
  const [priceStart, setPriceStart] = useState(minPrice);
  const [priceEnd, setPriceEnd] = useState(maxPrice);
  const [inStock, setInStock] = useState(true);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);

  const { handleCallback } = props;
  const { Panel } = Collapse;

  const onBrandChange = (checkedValues) => {
    setBrand(checkedValues);
  };

  const onCategoriesChange = (checkedValues) => {
    setCategory(checkedValues);
  };

  const brandOptions = ['Apple', 'Samsung', 'Huawei', 'The Warehouse', 'LouisWill'];

  const categoriesOptions = ['laptops', 'smartphones', 'groceries', 'automotive', 'lighting'];

  return (
    <div
      style={{
        padding: '15px 30px', borderRadius: '10px',
      }}
    >
      {handleCallback({
        priceStart, priceEnd, inStock, brand, category,
      })}

      <Collapse bordered={false} defaultActiveKey={['1']} className="sideBar">
        <Panel header="Product Category" key="1">
          <Checkbox.Group options={categoriesOptions} defaultValue={category} onChange={onCategoriesChange} />
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
          <Checkbox.Group options={brandOptions} defaultValue={brand} onChange={onBrandChange} />
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
