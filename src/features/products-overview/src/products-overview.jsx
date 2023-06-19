import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List, Row, Col, Grid, Empty,
} from 'antd';
import { MailOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import useProducts from '../../../api/product-service';
import Error from '../../../Components/error';
import Loader from '../../../Components/loader';
import Product from './product-info';
import FilterSideMenu from './filter-side-menu';
import '../products-overview.css';
import ToastNotification from '../../../Components/notification';
import SearchBar from './search-bar';

const { useBreakpoint } = Grid;

function ProductsListElement({ products, handleView, canShow }) {
  // if (!canShow) return false;
  if (!products || products.length === 0) {
    return (
      <div data-cy="test-products-list">
        <List
          style={{ backgroundColor: 'white' }}
          bordered
          dataSource={[1]}
          pagination={{
            align: 'center',
            pageSizeOptions: [10, 20, 30],
          }}
          renderItem={(item) => (
            canShow ? (
              <List.Item key={item.product_id} style={{ display: 'block' }}>
                <Empty
                  data-cy="products_empty"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                          // style={{ marginTop: '20vh' }}
                  description={(
                    <span>
                      No products available
                    </span>
                          )}
                />
              </List.Item>
            ) : null
          )}
        />
      </div>
    );
  }

  const [notificationVisible, setNotificationVisible] = useState({
    status: false, item: {}, amount: 0, updatableKey: '', isAdd: true,
  });

  const toastNotification = (
    <ToastNotification
      title={notificationVisible.isAdd ? 'Product Added' : 'Notify Enabled'}
      message={notificationVisible.isAdd
        ? (
          <>
            <span style={{ fontWeight: 'bold' }}>{notificationVisible.item.name}</span>
                  &nbsp;has been added to your cart.
            <br />
            New total:
            {' '}
            {notificationVisible.amount}
          </>
        )
        : (
          <>
            You will be notified when&nbsp;
            <span style={{ fontWeight: 'bold' }}>{notificationVisible.item.name}</span>
                &nbsp;will be in stock again.
          </>
        )}
      icon={notificationVisible.isAdd ? (
        <ShoppingCartOutlined
          style={{
            color: '#ff4d4f',
          }}
        />
      ) : (
        <MailOutlined
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
          style={{ backgroundColor: 'white' }}
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
  const productApi = useProducts();
  const [dbCategories, setDbCategories] = useState([]);
  const [dbBrands, setDbBrands] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortByOption, setSortByOption] = useState('');
  const [inStock, setInStock] = useState(false);
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  const updateValues = (props) => {
    if (props.name !== undefined) setName(props.name);
    if (props.minPrice !== undefined) setMinPrice(props.minPrice ?? 0);
    if (props.maxPrice !== undefined) setMaxPrice(props.maxPrice ?? 2000);
    if (props.brands !== undefined) setBrands(props.brands);
    if (props.categories !== undefined) setCategories(props.categories);
    if (props.sortByOption !== undefined) setSortByOption(props.sortByOption);
    if (props.inStock !== undefined) setInStock(props.inStock);
  };

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const categoryData = await productApi.getCategories();
      setDbCategories(categoryData);
      const brandData = await productApi.getBrands();
      setDbBrands(brandData);
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getFiltered(minPrice, maxPrice, inStock, brands, categories, sortByOption, name);
        setProduct(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [minPrice, maxPrice, brands, categories, sortByOption, inStock, name]);

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
          <FilterSideMenu
            handleCallback={updateValues}
            categories={dbCategories}
            brands={dbBrands}
            currentFilter={{
              minPrice, maxPrice, brands, categories, sortByOption, inStock,
            }}
          />
        </Col>
        <Col span={phoneFormatItemList} style={{ padding: phoneFormatPaddingItemList }}>
          <>
            <SearchBar handleSearch={updateValues} productNames={product} />
            <Loader
              loading={loading}
              extraStyle={{
                position: 'absolute', top: '30vh', left: '50%', zIndex: '9999',
              }}
            />
            <Error error={error} />
            <ProductsListElement products={product} handleView={handleView} canShow={!loading && !error} />
          </>
        </Col>
      </Row>
    </main>
  );
}
