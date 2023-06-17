import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List, Row, Col, Grid, Empty,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import useProducts from '../../../api/product-service';
import Error from '../../../Components/error';
import Loader from '../../../Components/loader';
import Product from './product-info';
import SearchBar from './search-bar';
import FilterSideMenu from './filter-side-menu';
import '../products-overview.css';
import ToastNotification from '../../../Components/notification';

const { useBreakpoint } = Grid;

function ProductsListElement({ products, handleView }) {
  if (!products || products.length === 0) {
    return (
      <Empty
        data-cy="products_empty"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={(
          <span>
            No products available
          </span>
      )}
      />
    );
  }

  const [notificationVisible, setNotificationVisible] = useState({
    status: false, item: {}, amount: 0, updatableKey: '',
  });

  const toastNotification = (
    <ToastNotification
      title="Product Added"
      message={
            (
              <>
                <span style={{ fontWeight: 'bold' }}>{notificationVisible.item.name}</span>
                  &nbsp;has been added to your cart.
                <br />
                New total:
                {' '}
                {notificationVisible.amount}
              </>
            )
          }
      icon={(
        <ShoppingCartOutlined
          style={{
            color: '#ff4d4f',
          }}
        />
          )}
      show={notificationVisible.status}
      updatable
      updatableKey={notificationVisible.updatableKey}
    />
  );

  return (
    <>
      {toastNotification}
      <div data-cy="test-products-list">
        <List
          bordered
          dataSource={products}
          pagination={{
            align: 'center',
            pageSizeOptions: [10, 20, 30],
          }}
          renderItem={(item) => (
            <List.Item key={item.product_id} style={{ display: 'block' }}>
              <Product data-cy="" product={item} onView={handleView} wantsNotificationShown={setNotificationVisible} />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default function ProductsOverview() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(2000);
  const [inStock, setInStock] = useState(true);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const [name, setName] = useState(null);

  const navigate = useNavigate();

  const productApi = useProducts();

  const callBack = (data) => {
    setPriceStart(data.priceS);
    setPriceEnd(data.priceE);
    setInStock(data.inStock);
    setBrand(data.brand);
    setCategory(data.category);
    setSortBy(data.sortBy);
  };

  const callBackSearch = (data) => {
    setName(data.name);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getFiltered(priceStart, priceEnd, inStock, brand, category, sortBy, name);
        setProduct(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [priceStart, priceEnd, inStock, brand, category, sortBy, name]);

  const handleView = useCallback(async (nameToView) => {
    try {
      setError(null);
      await productApi.getByName(nameToView);
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
    <main id="page">
      <Row>
        <Col span={phoneFormatSideBar} style={{ padding: phoneFormatPaddingSideBar }}>
          <FilterSideMenu handleCallback={callBack} />
        </Col>
        <Col span={phoneFormatItemList} style={{ padding: phoneFormatPaddingItemList }}>
          <Loader loading={loading} />
          <Error error={error} />
          <SearchBar handleSearch={callBackSearch} priceStart={priceStart} priceEnd={priceEnd} inStock={inStock} brand={brand} category={category} />
          {!loading && !error
            ? <ProductsListElement products={product} handleView={handleView} />
            : null}
        </Col>
      </Row>
    </main>
  );
}
