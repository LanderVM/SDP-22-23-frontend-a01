import {
  Collapse, Checkbox, Switch, Space, InputNumber, Col, Row, Button,
} from 'antd';
import { CheckOutlined, CloseOutlined, RightOutlined } from '@ant-design/icons';

import React, { useState, useEffect } from 'react';

import useProducts from '../../api/productService';

import './Sidebar.css';

const minPrice = 0;
const maxPrice = 2000;

export default function SideBarProductPage(props) {
  const [priceS, setPriceS] = useState(minPrice);
  const [priceE, setPriceE] = useState(maxPrice);
  const [priceStart, setPriceStart] = useState(minPrice);
  const [priceEnd, setPriceEnd] = useState(maxPrice);
  const [inStock, setInStock] = useState(true);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const { handleCallback } = props;
  const { Panel } = Collapse;

  const productenApi = useProducts();

  const searchByPrice = () => {
    setPriceS(priceStart);
    setPriceE(priceEnd);
  };

  const onBrandChange = (checkedValues) => {
    setBrand(checkedValues);
  };

  const onCategoriesChange = (checkedValues) => {
    setCategory(checkedValues);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await productenApi.getBrands();
        setBrands(data);
      } catch (error2) {
        console.log(error2);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productenApi.getCategories();
        setCategories(data);
      } catch (error2) {
        console.log(error2);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      style={{
        padding: '15px 30px', borderRadius: '10px',
      }}
    >
      {handleCallback({
        priceS, priceE, inStock, brand, category,
      })}

      <Collapse bordered={false} defaultActiveKey={['1']} className="sideBar">
        <Panel header="Product Category" key="1">
          <Checkbox.Group options={categories.map((e) => e.category)} defaultValue={category} onChange={onCategoriesChange} />
        </Panel>
        <Panel header="Price" key="2" data-cy="test-products-filter-priceTab">
          <Row>
            <Col>
              <InputNumber value={priceStart} formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} defaultValue={priceStart} min={minPrice} max={maxPrice} onChange={(newPrice) => setPriceStart(newPrice)} data-cy="test-products-filter-price-firstInput" />
            </Col>
            <Col>
              &nbsp; - &nbsp;
            </Col>
            <Col>
              <InputNumber value={priceEnd} formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} defaultValue={priceEnd} min={minPrice} max={maxPrice} onChange={(newPrice) => setPriceEnd(newPrice)} data-cy="test-products-filter-price-secondInput" />
            </Col>
            <Button
              type="primary"
              icon={<RightOutlined />}
              onClick={searchByPrice}
            />
          </Row>
        </Panel>
        <Panel header="Brand" key="3">
          <Checkbox.Group options={brands.map((e) => e.brand)} defaultValue={brand} onChange={onBrandChange} />
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
