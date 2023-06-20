import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';

import {
  List, Col, Row, Grid, Empty, Button,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { ShoppingCartProducts } from '../../../contexts/shopping-cart-products';
import Error from '../../../Components/error';
import Loader from '../../../Components/loader';
import Products from './products';
import SideOverview from './side-overview';
import useProducts from '../../../api/product-service';
import '../shopping-cart.css';
import ToastNotification from '../../../Components/notification';
import PopularOverview from './popular-overview';

const { useBreakpoint } = Grid;
export default function ShoppingCart() {
  const {
    productsFromContext, removeProductFromShoppingCartContext, addProductToShoppingCartContext,
  } = useContext(ShoppingCartProducts);
  const { lg } = useBreakpoint();

  const [error, setError] = useState(null);
  const [modifiedProduct, setModifiedProduct] = useState({ item: {}, amount: -99 });
  const [loading, setLoading] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState({ status: false, isRemove: false, updatable: false });

  const [myCart, setCart] = useState([]);
  const productApi = useProducts();

  const fetchCartItems = async (id) => {
    const doIt = async () => {
      if (id !== undefined) {
        removeProductFromShoppingCartContext(id);
        const removedProduct = myCart.find((product) => product.product_id === id);
        setModifiedProduct({ item: removedProduct, amount: -1 });
        setCart(myCart.filter((product) => product.product_id !== id));
      }
    };
    doIt();
  };

  const handleChange = (cart, value) => {
    const doIt = () => {
      addProductToShoppingCartContext(cart, parseInt(value, 10));
      setModifiedProduct({ item: cart, amount: value });
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
    if (modifiedProduct.amount === -99) return;
    const isRemoved = modifiedProduct.amount === -1;
    setNotificationVisible({
      status: true, isRemove: isRemoved, updatable: !isRemoved, updatableKey: modifiedProduct.item.product_id,
    });
    setTimeout(() => setNotificationVisible({ status: false, isRemove: true, updatable: false }), 100);
  }, [modifiedProduct]);

  const toastNotification = (
    <ToastNotification
      title={notificationVisible.isRemove ? 'Product Removed' : 'Product Updated'}
      message={
        (notificationVisible.isRemove
          ? (
            <>
              <span style={{ fontWeight: 'bold' }}>{modifiedProduct.item.name}</span>
                  &nbsp;has been removed from your cart.
            </>
          )
          : (
            <>
              <span style={{ fontWeight: 'bold' }}>{modifiedProduct.item.name}</span>
            &nbsp;total amount has been updated to&nbsp;
              <span style={{ fontWeight: 'bold' }}>{modifiedProduct.amount}</span>
              .
            </>
          )
        )
}
      icon={notificationVisible.isRemove ? (
        <DeleteOutlined
          style={{
            color: '#ff4d4f',
          }}
        />
      )
        : (
          <AppstoreAddOutlined
            style={{
              color: '#ff4d4f',
            }}
          />
        )}
      show={notificationVisible.status}
      updatable={notificationVisible.updatable}
      updatableKey={notificationVisible.updatableKey}
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
        {toastNotification}
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
      {toastNotification}
      <Row>
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
                pageSize: 6,
              }}
              renderItem={(item) => (
                <List.Item key={item.product_id} style={{ display: 'block' }}>
                  {!loading && !error ? <Products cart={item} onView={handleView} handleDelete={fetchCartItems} handleChange={handleChange} context={ShoppingCartProducts} />
                    : null}
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col span={phoneFormatOverView} style={{ padding: phoneFormatPaddingOverView }}>
          {!loading && !error && myCart.length === productsFromContext.length
            ? <SideOverview cart={myCart} context={ShoppingCartProducts} />
            : null}
        </Col>
      </Row>
      <Row>
        <Col span={phoneFormatItemList} style={{ padding: phoneFormatPaddingItemList }}>
          <h1>Most popular products</h1>
          <PopularOverview />
        </Col>
      </Row>
    </main>
  );
}
