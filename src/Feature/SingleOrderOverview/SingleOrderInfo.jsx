import React from 'react';
import { Col, List, Row } from 'antd';

import moment from 'moment';
import getStatusAsString from '../../utils';
import SingleProductInfo from './SingleProductInfo';

export default function SingleOrderInfo({ order }) {
  if (!order) return null;
  return (
    <Row>
      <Col span={24}>
        <Row className="delaware-order-info-body-header">
          <Col span={23}>
            <span style={{ color: 'grey' }}>Ordered on: </span>
            <span style={{ fontWeight: 'bold' }}>
              {moment(order.order_info.order_date.split('T')[0]).format('LL')}
            </span>
          </Col>
        </Row>
        <List
          bordered
          style={{ backgroundColor: 'white' }}
          dataSource={order.product_list}
          data-cy="shoppingCart"
          renderItem={(item) => (
            <List.Item key={item.product_id} style={{ display: 'block' }}>
              <SingleProductInfo product={item} />
            </List.Item>
          )}
        />
        <p className="delaware-order-info-body-header-status">
          {getStatusAsString(order.order_info.order_status)}
        </p>
      </Col>
    </Row>
  );
}
