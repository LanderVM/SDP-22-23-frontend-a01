import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Row, Col, Grid, Button, InputNumber, Space,
} from 'antd';
import { ShoppingCartProducts } from '../../../contexts/shopping-cart-products';
import '../products-overview.css';

const { useBreakpoint } = Grid;

export default function ProductInfo({
  product, wantsNotificationShown,
}) {
  const {
    addProductToShoppingCartContext, productsFromContext,
  } = useContext(ShoppingCartProducts);
  const [productAmount, setProductAmount] = useState(1);
  const link = `/product/${product.product_id}`;

  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '24px' : '16px';
  const fontSizeDesc = lg ? '18px' : '14px';
  const fontSizeIcon = lg ? '130%' : '80%';
  const fontSizeIco2 = lg ? '80%' : '60%';
  const buttonHeight = lg ? '40px' : '35px';

  const productWanted = productsFromContext.filter((e) => e.productId === product.product_id);
  let productAmountExisting = 0;
  if (productWanted.length === 1) {
    productAmountExisting = productWanted.map((el) => el.amount);
  }

  const onChangeAmount = (value) => {
    setProductAmount(value);
  };

  const handleAdd = (toAddProduct, amount) => {
    const doIt = () => {
      addProductToShoppingCartContext(toAddProduct, amount);
      wantsNotificationShown({
        status: true, item: toAddProduct, amount, updatableKey: toAddProduct.product_id,
      });
      setTimeout(() => wantsNotificationShown({
        status: false, item: {}, amount: 0, key: '',
      }), 100);
    };
    doIt();
  };

  return (
    <Row gutter={{
      xs: 8, sm: 16, md: 24, lg: 32,
    }}
    >
      <Col>
        <img src={product.image_URL} alt="product" width="150px" />
      </Col>
      <Col style={{ flex: '1 0 50%' }}>
        <NavLink to={link} style={{ fontSize: fontSizeName }} className="linkTo" data-cy="productNameUrl"><b>{product.name}</b></NavLink>
        <div style={{ fontSize: fontSizeDesc }}>{product.description}</div>
      </Col>
      <Col style={{ textAlign: 'right', justifyContent: 'right', flex: '1 0 25%' }}>
        <div data-cy="products_price" style={{ fontSize: fontSizeName }}>
          €
          {' '}
          {product.price}
        </div>
        <Space direction="horizontal">
          <InputNumber
            min={1}
            max={100}
            formatter={(value) => value.replace(/^$/, '0')}
            parser={(value) => value.replace(/^$/, '0')}
            defaultValue={productAmount}
            onChange={onChangeAmount}
            style={{ width: '70px' }}
          />
          <Button
            type="primary"
            danger
            data-cy="btnAddToCart"
            onClick={(e) => {
              e.preventDefault();
              handleAdd(product, parseInt(productAmountExisting, 10) + productAmount);
            }}
            style={{
              fontSize: '20px', height: buttonHeight, verticalAlign: '3px',
            }}
          >
            <PlusOutlined style={{ fontSize: fontSizeIco2, verticalAlign: '3px' }} />
            <ShoppingCartOutlined style={{ fontSize: fontSizeIcon, verticalAlign: '3px' }} />
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
