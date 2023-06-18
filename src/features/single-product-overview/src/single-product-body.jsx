import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Row, Col, Grid, Button,
} from 'antd';
import {
  CheckOutlined, ClockCircleOutlined, MailOutlined, ShopOutlined, ShoppingCartOutlined, WarningOutlined,
} from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
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

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const { md } = useBreakpoint();
  const [notificationVisible, setNotificationVisible] = useState({ status: false, isAdd: false });
  const imageMobileFormat = md ? 12 : 24;
  const fontSizeAddToCartIcon = md ? '170%' : '120%';
  const fontSizeNotifyIcon = md ? '150%' : '100%';
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
    const doIt = () => {
      addProductToShoppingCartContext(product, parseInt(productAmount, 10) + 1);
      setNotificationVisible({ status: true, isAdd: true });
      setTimeout(() => setNotificationVisible({ status: true, isAdd: true }), 200);
    };
    doIt();
  };

  const handleNotify = () => {
    const doIt = () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      setNotificationVisible({ status: true, isAdd: false });
      setTimeout(() => setNotificationVisible({ status: false, isAdd: false }), 200);
    };
    doIt();
  };

  const toastNotification = (
    <ToastNotification
      title={notificationVisible.isAdd ? 'Product Added' : 'Notify Enabled'}
      message={notificationVisible.isAdd ? (
        <>
          <span style={{ fontWeight: 'bold' }}>{product.name}</span>
              &nbsp;has been added to your cart.
          <br />
          New total:
          {' '}
          {parseInt(productAmount, 10)}
        </>
      ) : (
        <>
          You will be notified when&nbsp;
          <span style={{ fontWeight: 'bold' }}>{product.name}</span>
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
              {product.stock > 0
                ? (
                  <ShopOutlined style={{
                    color: '#ff4d4f',
                  }}
                  />
                ) : (
                  <WarningOutlined style={{
                    color: '#ff4d4f',
                  }}
                  />
                ) }
              {product.stock > 0 ? `  ${product.stock} units available` : '  Out of Stock'}
            </p>
            {product.stock > 0 ? (
              <Button
                type="primary"
                danger
                data-cy="btnAddToCart"
                onClick={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
                style={{
                  fontSize: fontSizeAddToCartIcon,
                  height: buttonHeight,
                  margin: marginDetails,
                  width: '15vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ShoppingCartOutlined style={{ fontSize: fontSizeAddToCartIcon }} />
                <span style={{
                  fontSize: '120%',
                }}
                >
                  Add to cart
                </span>
              </Button>
            ) : (
              <Button
                type="primary"
                danger
                data-cy="btnAddToCart"
                onClick={(e) => {
                  e.preventDefault();
                  handleNotify();
                }}
                style={{
                  fontSize: fontSizeAddToCartIcon,
                  height: buttonHeight,
                  margin: marginDetails,
                  width: '15vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MailOutlined style={{ fontSize: fontSizeNotifyIcon }} />
                <span style={{
                  fontSize: '120%',
                }}
                >
                  Notify me
                </span>
              </Button>
            )}
            <p style={{ fontSize: fontSizeSmall, margin: marginDetails }}>
              <CheckOutlined style={{
                color: '#ff4d4f',
              }}
              />
                          &nbsp; 2 year warranty
              <br />
              <CheckOutlined style={{
                color: '#ff4d4f',
              }}
              />
                          &nbsp; 2 weeks return policy
              <br />
              {product.stock > 0 ? null : (
                <>
                  <ClockCircleOutlined style={{
                    color: '#ff4d4f',
                  }}
                  />
                  <>
&nbsp; Estimated restock time:
                    {' '}
                    {product.delivery_time}
                  </>
                  <br />
                </>
              )}
              <ClockCircleOutlined style={{
                color: '#ff4d4f',
              }}
              />
                &nbsp; Estimated delivery time:
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
