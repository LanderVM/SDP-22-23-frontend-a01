import { Button, Col, Row } from 'antd';
import React from 'react';
import './productInfo.scss';
import { NavLink } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';

export default function ProductInfo({ product }) {
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
      <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <NavLink to={`/orders/${product.ORDER_order_id}`}>
          <Button className="delaware-order-info-body-info-button">
            <p>More Info</p>
            <AiOutlineRight />
          </Button>
        </NavLink>
      </Col>
    </Row>
  );
}
