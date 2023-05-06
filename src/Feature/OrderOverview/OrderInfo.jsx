import React from 'react';
import { Col, Row } from 'antd';
import moment from 'moment';
import ProductInfo from './ProductInfo';
import './orderInfo.scss';
import getStatusAsString from '../../utils';

export default function OrderInfo({ productList }) {
  return (
    <Row>
      <Col span={24}>
        <Row className="delaware-order-info-body-header">
          <Col span={23}>
            <p>
              {moment(productList[0].order_date.split('T')[0]).format('LL')}
                            &nbsp;|&nbsp;Order&nbsp;#
              {productList[0].ORDER_order_id}
            </p>
            <p className="delaware-order-info-body-header-status">
              {getStatusAsString(productList[0].order_status)}
            </p>
          </Col>
        </Row>
        {productList.map((product) => (
          <ProductInfo
            product={product}
            key={`${product.ORDER_order_id}_${product.PRODUCT_product_id}}`}
          />
        ))}
      </Col>
    </Row>
  );
}
