import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List, Row, Col, Grid, Empty,
} from 'antd';
import useProducts from '../../api/productService';
import Error from '../Error';
import Loader from '../Loader';
import Product from './ProductElement';
import SideBarProductPage from './SideBarProductPage';

const { useBreakpoint } = Grid;

function ProductsListElement({ products, handleView }) {
  if (!products || products.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={(
          <span>
            No products available
          </span>
      )}
      />
    );
  }

  return (
    <div data-cy="test-products-list">
      <List
        bordered
        dataSource={products}
        pagination={{
          align: 'center',
          pageSize: 10,
        }}
        renderItem={(item) => (
          <List.Item key={item.product_id} style={{ display: 'block' }}>
            <Product product={item} onView={handleView} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default function ProductsList() {
  const [producten, setProducten] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(2000);
  const [inStock, setInStock] = useState(true);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);

  const navigate = useNavigate();

  const productenApi = useProducts();

  const callBack = (data) => {
    setPriceStart(data.priceS);
    setPriceEnd(data.priceE);
    setInStock(data.inStock);
    setBrand(data.brand);
    setCategory(data.category);
  };

  useEffect(() => {
    const fetchProducten = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productenApi.getFiltered(priceStart, priceEnd, inStock, brand, category);
        setProducten(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchProducten();
  }, [priceStart, priceEnd, inStock, brand, category]);

  const handleView = useCallback(async (nameToView) => {
    try {
      setError(null);
      await productenApi.getByName(nameToView);
      navigate(`product/${nameToView}`);
    } catch (err) {
      setError(err);
    }
  }, []);

  const { lg } = useBreakpoint();

  const phoneFormatSideBar = lg ? '6' : '24';
  const phoneFormatItemList = lg ? '18' : '24';
  const phoneFormatPaddingSideBar = lg ? '40px 20px 40px 40px' : '20px';
  const phoneFormatPaddingItemList = lg ? '40px 40px 40px 20px' : '20px';

  return (
    <Row>
      <Col span={phoneFormatSideBar} style={{ padding: phoneFormatPaddingSideBar }}>
        <SideBarProductPage handleCallback={callBack} />
      </Col>
      <Col span={phoneFormatItemList} style={{ padding: phoneFormatPaddingItemList }}>
        <Loader loading={loading} />
        <Error error={error} />
        {!loading && !error ? <ProductsListElement products={producten} handleView={handleView} />
          : null}
      </Col>
    </Row>
  );
}
