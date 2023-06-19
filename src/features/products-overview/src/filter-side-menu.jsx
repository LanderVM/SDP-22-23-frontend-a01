import {
  Collapse, Checkbox, Switch, Space, InputNumber, Col, Row, Radio,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import '../products-overview.css';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const minPrice = 0;
const maxPrice = 2000;

export default function FilterSideMenu({
  handleCallback, currentFilter, categories, brands,
}) {
  const { Panel } = Collapse;

  const debouncedSetPriceStart = useDebouncedCallback((newPrice) => {
    handleCallback({ minPrice: newPrice });
  }, 400);

  const debouncedSetPriceEnd = useDebouncedCallback((newPrice) => {
    handleCallback({ maxPrice: newPrice });
  }, 400);

  const sortValues = [
    {
      value: 'price',
      label: 'Price',
      key: 'price',
    },
    {
      value: 'name',
      label: 'Name',
      key: 'name',
    },
    {
      value: '',
      label: 'None',
      key: 'none',
    },
  ];

  const { lg } = useBreakpoint();

  const style = lg ? { position: 'fixed', width: '20%' } : null;

  return (
    <div
      style={{
        borderRadius: '10px',
        ...style,
      }}
    >
      <Collapse defaultActiveKey={['4', '5']} className="sideBar" size="medium">
        <Panel header="Product Category" key="1">
          <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            <Checkbox.Group options={categories.map((e) => e.category)} defaultValue={currentFilter.categories} onChange={(checkedValues) => handleCallback({ categories: checkedValues })} />
          </div>
        </Panel>
        <Panel header="Price" key="2" data-cy="test-products-filter-priceTab">
          <Row>
            <Col>
              <InputNumber
                value={currentFilter.minPrice}
                formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                defaultValue={0}
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
                value={currentFilter.maxPrice}
                formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                defaultValue={2000}
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
            <Checkbox.Group options={brands.map((e) => e.brand)} defaultValue={currentFilter.brands} onChange={(checkedValues) => handleCallback({ brands: checkedValues })} />
          </div>
        </Panel>
        <Panel header="Availability" key="4" data-cy="test-products-filter-inStockTab">
          <Space>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onClick={(value) => handleCallback({ inStock: value })}
              data-cy="test-products-filter-inStock"
              style={{ backgroundColor: '#ec4242' }}
            />
            <span>Only show in stock</span>
          </Space>
        </Panel>
        <Panel header="Sort" key="5" data-cy="test-products-filter-sortTab">
          <Radio.Group defaultValue={currentFilter.sortByOption} options={sortValues} onChange={(value) => handleCallback({ sortByOption: value.target.value })} optionType="button" buttonStyle="solid" />
        </Panel>
      </Collapse>
    </div>
  );
}
