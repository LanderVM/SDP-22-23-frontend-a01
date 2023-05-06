import React from 'react';
import {
  Col, Row,
} from 'antd';
import moment from 'moment';
import ProductInfo from './ProductInfo';
import './orderInfo.scss';
import getStatusAsString from '../../utils';

export default function OrderInfo({ productList }) {
  return (
    <Row>
      <Col span={24}>
        <Row className="delaware-order-info-body-header">
          <p key="orderInfoHeader1">
            {moment(productList[0].order_date.split('T')[0]).format('LL')}
          </p>
          <p key="orderInfoHeader2">
              &nbsp;|&nbsp;Order&nbsp;number&nbsp;
            {productList[0].ORDER_order_id}
            &nbsp;|&nbsp;
          </p>
          <p key="orderInfoHeader3" className="delaware-order-info-body-header-status">
            {getStatusAsString(productList[0].order_status)}
          </p>
        </Row>
        {productList.map((product) => <ProductInfo product={product} key={`${product.ORDER_order_id}_${product.PRODUCT_product_id}}`} />)}
      </Col>
    </Row>
  );
}
