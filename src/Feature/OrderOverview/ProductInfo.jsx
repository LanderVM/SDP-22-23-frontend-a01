import { Col, Row } from 'antd';
import React from 'react';
import './productInfo.scss';

export default function ProductInfo({ product }) {
  console.log(product);

  return (
    <Row className="delaware-product-info">
      <Col>
        <img src={product.image_URL} alt={product.name} />
      </Col>
      <Col className="delaware-product-info-body">
        <Row>
          <h1>{`${product.brand} ${product.name}`}</h1>
        </Row>
      </Col>
    </Row>
  );
}
