import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';

import {
  List, Col, Row, Grid, Empty, Button,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { ShoppingCartProducts } from '../../../contexts/shopping-cart-products';
import Error from '../../../Components/error';
import Loader from '../../../Components/loader';
import Products from './products';
import SideOverview from './side-overview';
import useProducts from '../../../api/product-service';
import '../shopping-cart.css';
import ToastNotification from '../../../Components/notification';

const { useBreakpoint } = Grid;
export default function ShoppingCart() {
  const {
    productsFromContext, removeProductFromShoppingCartContext,
  } = useContext(ShoppingCartProducts);
  const { lg } = useBreakpoint();

  const [error, setError] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const [myCart, setCart] = useState([]);
  const productApi = useProducts();

  const fetchCartItems = async (id) => {
    console.log(`FETCHING FROM ${id}`);
    const doIt = async () => {
      if (id !== undefined) {
        console.log('DELETING...');
        removeProductFromShoppingCartContext(id);
        setCart(myCart.filter((product) => product.product_id !== id));
        setDeletedId(id);
        console.log('DELETION COMPLETE');
      }
    };
    doIt();
  };

  useEffect(() => {
    const doIt = async () => {
      try {
        setLoading(true);
        setError(null);
        if (productsFromContext.length === 0) {
          setCart([]);
        } else {
          const data = await productApi.getByIds(productsFromContext);
          setCart(data);
        }
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    doIt();
  }, []);

  useEffect(() => {
    console.log(`GETTING NOTIF STATUS FOR ${deletedId}`);
    if (deletedId !== null) {
      console.log(`SETTING TRUE FOR ${deletedId}`);
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 5000);
      console.log(`SETTING FALSE FOR ${deletedId}`);
    }
  }, [deletedId]);

  const notif = (
    <ToastNotification
      title="Product Removed"
      message=""
      icon={(
        <DeleteOutlined
          style={{
            color: '#ff4d4f',
          }}
        />
          )}
      show={notificationVisible}
    />
  );

  const handleView = useCallback(async (nameToView) => {
    try {
      setError(null);
      await productApi.getByName(nameToView);
    } catch (err) {
      setError(err);
    }
  }, []);

  if (!myCart || myCart.length === 0) {
    return (
      <main>
        {notif}
        <Empty style={{ marginTop: '20vh' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no items in your shopping cart">
          <NavLink to="/products"><Button type="primary">Continue shopping</Button></NavLink>
        </Empty>
      </main>
    );
  }

  const phoneFormatItemList = lg ? '18' : '24';
  const phoneFormatOverView = lg ? '6' : '24';
  const phoneFormatPaddingItemList = lg ? '40px 20px 40px 40px' : '20px';
  const phoneFormatPaddingOverView = lg ? '40px 40px 40px 20px' : '20px';

  return (
    <main>
      {notif}
      <Row>
        {myCart.length === productsFromContext.length
          ? (
            <Col span={phoneFormatItemList} style={{ padding: phoneFormatPaddingItemList }}>
              <Loader loading={loading} />
              <Error error={error} />
              <div>
                <List
                  bordered
                  style={{ backgroundColor: 'white' }}
                  dataSource={myCart}
                  data-cy="shoppingCart"
                  pagination={{
                    align: 'center',
                    pageSize: 10,
                  }}
                  renderItem={(item) => (
                    <List.Item key={item.productId} style={{ display: 'block' }}>
                      {!loading && !error ? <Products cart={item} onView={handleView} handleDelete={fetchCartItems} context={ShoppingCartProducts} />
                        : null}
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          )
          : <p>aaaaaa</p>}
        <Col span={phoneFormatOverView} style={{ padding: phoneFormatPaddingOverView }}>
          {!loading && !error && myCart.length === productsFromContext.length
            ? <SideOverview cart={myCart} context={ShoppingCartProducts} />
            : null}
        </Col>
      </Row>
    </main>
  );
}
