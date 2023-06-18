import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Row, Col, Grid, Button,
} from 'antd';
import { CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { ShoppingCartProducts } from '../../../contexts/shopping-cart-products';
import '../single-product-overview.css';
import ToastNotification from '../../../Components/notification';

const { useBreakpoint } = Grid;

export default function SingleProductBody({
  product,
}) {
  const {
    addProductToShoppingCartContext, productsFromContext,
  } = useContext(ShoppingCartProducts);

  const { md } = useBreakpoint();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const imageMobileFormat = md ? 12 : 24;
  const fontSizeIcon = md ? '170%' : '120%';
  const buttonHeight = md ? '60px' : '40px';
  const paddingTextMF = md ? '3% 5%' : '0';
  const fontSizeTitle = md ? '40px' : '30px';
  const fontSizeSmall = md ? '20px' : '15px';
  const fontSizeDetails = md ? '30px' : '20px';
  const marginDetails = md ? '10px' : '5px';

  const productWanted = productsFromContext.filter((e) => e.productId === product.product_id);
  let productAmount = 0;
  if (productWanted.length === 1) {
    productAmount = productWanted.map((el) => el.amount);
  }

  const handleAdd = () => {
    addProductToShoppingCartContext(product, parseInt(productAmount, 10) + 1);
    const doIt = () => {
      addProductToShoppingCartContext(product, parseInt(productAmount, 10) + 1);
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 200);
    };
    doIt();
  };

  const toastNotification = (
    <ToastNotification
      title="Product Added"
      message={
                (
                  <>
                    <span style={{ fontWeight: 'bold' }}>{product.name}</span>
                        &nbsp;has been added to your cart.
                    <br />
                    New total:
                    {' '}
                    {parseInt(productAmount, 10)}
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
      show={notificationVisible}
      updatable
      updatableKey={product.product_id}
    />
  );

  return (
    <>
      {toastNotification}
      <div>
        <NavLink to="/products" className="linkTo">
          &lt; Back to products
        </NavLink>
        <div style={{ fontSize: fontSizeTitle }} data-cy="productName">
          <b>{product.name}</b>
        </div>
        <div style={{ fontSize: fontSizeSmall }} data-cy="productBrand">
          {product.brand}
        </div>
        <Row>
          <Col span={imageMobileFormat}>
            <img src={product.image_URL} width="100%" alt="" style={{ padding: '10px 0' }} data-cy="productImage" />
          </Col>
          <Col span={imageMobileFormat} style={{ padding: paddingTextMF }}>
            <p style={{ fontSize: fontSizeDetails, margin: marginDetails }} data-cy="productPrice">
              <b>
                €
                {' '}
                {product.price}
              </b>
            </p>
            <p style={{ fontSize: fontSizeDetails, color: product.stock > 0 ? 'green' : 'red', margin: marginDetails }} data-cy="productStock">
              {product.stock > 0 ? `in stock (${product.stock} left)` : 'Out of stock'}
            </p>
            <Button
              type="primary"
              danger
              data-cy="btnAddToCart"
              onClick={(e) => {
                e.preventDefault();
                handleAdd();
              }}
              style={{
                fontSize: fontSizeIcon, height: buttonHeight, verticalAlign: '10px', margin: marginDetails,
              }}
            >
              <ShoppingCartOutlined style={{ fontSize: fontSizeIcon }} />
              Add to cart
            </Button>
            <p style={{ fontSize: fontSizeSmall, margin: marginDetails }}>
              <CheckOutlined />
                          &nbsp; 2 year warranty
              <br />
              <CheckOutlined />
                          &nbsp; 2 weeks return policy
              <br />
              Estimated delivery time:
              {' '}
              {product.delivery_time}
            </p>
          </Col>
        </Row>
        <div style={{ fontSize: fontSizeDetails }}>
          <b>Product description</b>
        </div>
        <div data-cy="productDescription" style={{ fontSize: fontSizeSmall }}>
          {product.description}
        </div>

      </div>
    </>
  );
}
