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
          <p>
            {moment(productList[0].order_date.split('T')[0]).format('LL')}
          </p>
          <p>
              &nbsp;|&nbsp;Order&nbsp;number&nbsp;
            {productList[0].ORDER_order_id}
            &nbsp;|&nbsp;
          </p>
          <p className="delaware-order-info-body-header-status">
            {getStatusAsString(productList[0].order_status)}
          </p>
        </Row>
        {productList.map((product) => <ProductInfo product={product} />)}
      </Col>
    </Row>
  );
}
