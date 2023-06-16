import {
  Collapse, Checkbox, Switch, Space, InputNumber, Col, Row, Radio,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import React, { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import useProducts from '../../../api/product-service';

import '../products-overview.css';
import Error from '../../../Components/error';

const minPrice = 0;
const maxPrice = 2000;

export default function FilterSideMenu(props) {
  const [error, setError] = useState(null);
  const [priceS, setPriceS] = useState(minPrice);
  const [priceE, setPriceE] = useState(maxPrice);
  const [priceStart, setPriceStart] = useState(minPrice);
  const [priceEnd, setPriceEnd] = useState(maxPrice);
  const [inStock, setInStock] = useState(false);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const { handleCallback } = props;
  const { Panel } = Collapse;

  const productsApi = useProducts();

  const debouncedSetPriceStart = useDebouncedCallback((newPrice) => {
    setPriceStart(newPrice);
    setPriceS(newPrice);
  }, 400);

  const debouncedSetPriceEnd = useDebouncedCallback((newPrice) => {
    setPriceEnd(newPrice);
    setPriceE(priceEnd);
  }, 400);

  const onBrandChange = (checkedValues) => {
    setBrand(checkedValues);
  };

  const onCategoriesChange = (checkedValues) => {
    setCategory(checkedValues);
  };

  const onSortByChange = (value) => {
    setSortBy(value.target.value);
  };

  useEffect(() => {
    handleCallback({
      priceS, priceE, inStock, brand, category, sortBy,
    });
  }, [priceS, priceE, inStock, brand, category, sortBy]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await productsApi.getBrands();
        setBrands(data);
      } catch (error2) {
        setError(error2);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productsApi.getCategories();
        setCategories(data);
      } catch (error2) {
        setError(error2);
      }
    };
    fetchCategories();
  }, []);

  const sortValues = [
    {
      value: 'price',
      name: 'Price',
    },
    {
      value: 'name',
      name: 'Name',
    },
    {
      value: '',
      name: 'None',
    },
  ];

  return (
    <div
      style={{
        borderRadius: '10px',
      }}
    >
      {error
        ? <Error error={error} />
        : null}
      <Collapse defaultActiveKey={['4', '5']} className="sideBar" size="medium">
        <Panel header="Product Category" key="1">
          <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            <Checkbox.Group options={categories.map((e) => e.category)} defaultValue={category} onChange={onCategoriesChange} />
          </div>
        </Panel>
        <Panel header="Price" key="2" data-cy="test-products-filter-priceTab">
          <Row>
            <Col>
              <InputNumber
                value={priceStart}
                formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                defaultValue={priceStart}
                min={minPrice}
                max={maxPrice}
                onChange={(input) => debouncedSetPriceStart(input)}
                data-cy="test-products-filter-price-firstInput"
              />
            </Col>
            <Col>
              &nbsp; - &nbsp;
            </Col>
            <Col>
              <InputNumber
                value={priceEnd}
                formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                defaultValue={priceEnd}
                min={minPrice}
                max={maxPrice}
                onChange={(input) => debouncedSetPriceEnd(input)}
                data-cy="test-products-filter-price-secondInput"
              />
            </Col>
          </Row>
        </Panel>
        <Panel header="Brand" key="3">
          <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            <Checkbox.Group options={brands.map((e) => e.brand)} defaultValue={brand} onChange={onBrandChange} />
          </div>
        </Panel>
        <Panel header="Availability" key="4" data-cy="test-products-filter-inStockTab">
          <Space>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onClick={() => setInStock(!inStock)}
              data-cy="test-products-filter-inStock"
              style={{ backgroundColor: '#1677ff' }}
            />
            <span>Only show in stock</span>
          </Space>
        </Panel>
        <Panel header="Sort" key="5" data-cy="test-products-filter-sortTab">
          <Radio.Group defaultValue={sortBy} onChange={onSortByChange}>
            <Space direction="vertical">
              {sortValues.map((e) => <Radio data-cy={`test-products-filter-sortOn${e.name}Option`} value={e.value} key={e.value}>{e.name}</Radio>)}
            </Space>
          </Radio.Group>
        </Panel>
      </Collapse>

    </div>
  );
}
