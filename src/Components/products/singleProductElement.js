import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Row, Col, Grid, Button,
} from 'antd';
import { CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';
import './Sidebar.css';

const { useBreakpoint } = Grid;

export default function SingleProductElement({
  product,
}) {
  const {
    addProductToShoppingCartContext,
  } = useContext(ProductsForShoppingCartContext);

  const { md } = useBreakpoint();
  const imageMobileFormat = md ? 12 : 24;
  // const textMobileFormat = md ? '20% 100px' : '';
  const fontSizeIcon = md ? '170%' : '120%';
  // const fontSizeIco2 = md ? '110%' : '60%';
  const buttonHeight = md ? '60px' : '40px';
  const paddingTextMF = md ? '3% 5%' : '0';
  const fontSizeTitle = md ? '40px' : '30px';
  const fontSizeSmall = md ? '20px' : '15px';
  const fontSizeDetails = md ? '30px' : '20px';
  const marginDetails = md ? '10px' : '5px';

  return (
    <div>
      <NavLink to="/products" className="linkTo">
        &lt; Back to products
      </NavLink>
      <div style={{ fontSize: fontSizeTitle }}>
        <b>{product.name}</b>
      </div>
      <div style={{ fontSize: fontSizeSmall }}>
        {product.brand}
      </div>
      <Row>
        <Col span={imageMobileFormat}>
          <img src={product.image_URL} width="100%" alt="" style={{ padding: '10px 0' }} />
        </Col>
        <Col span={imageMobileFormat} style={{ padding: paddingTextMF }}>
          <p style={{ fontSize: fontSizeDetails, margin: marginDetails }}>
            <b>
              €
              {' '}
              {product.price}
            </b>
          </p>
          <p style={{ fontSize: fontSizeDetails, color: product.stock > 0 ? 'green' : 'red', margin: marginDetails }}>
            {product.stock > 0 ? `in stock (${product.stock} left)` : 'Out of stock'}
          </p>
          <Button
            type="primary"
            danger
            data-cy="btnAddToCart"
            onClick={() => addProductToShoppingCartContext(product)}
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
          </p>
        </Col>
      </Row>
      <div style={{ fontSize: fontSizeDetails }}>
        <b>Product description</b>
      </div>
      <div style={{ fontSize: fontSizeSmall }}>
        {product.description}
      </div>
    </div>
  );
}
