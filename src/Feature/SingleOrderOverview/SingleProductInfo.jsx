import { Col, Row } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import './singleProductInfo.scss';

export default function SingleProductInfo({ product }) {
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '24px' : '16px';
  const fontSizeDesc = lg ? '18px' : '14px';

  const link = `/product/${product.product_id}`;

  return (
    <Row
      gutter={{
        xs: 8, sm: 16, md: 24, lg: 32,
      }}
      className="delaware-single-product-info"
    >
      <Col>
        <img src={product.image_URL} alt="product" width="150px" />
      </Col>
      <Col style={{ flex: '1 0 50%' }}>
        <NavLink to={link} style={{ fontSize: fontSizeName }} className="linkTo" data-cy="productNameUrl"><b>{product.name}</b></NavLink>
        <div style={{ fontSize: fontSizeDesc }}>
          {product.product_count}
          &nbsp;x&nbsp;€&nbsp;
          {product.original_acquisition_price}
        </div>
      </Col>
      <Col style={{ textAlign: 'right', justifyContent: 'right', flex: '1 0 25%' }}>
        <div style={{ fontSize: fontSizeName }}>
          €
          {' '}
          {product.original_acquisition_price * product.product_count}
        </div>

      </Col>
    </Row>
  );
}
