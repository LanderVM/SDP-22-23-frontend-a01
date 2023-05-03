import React from 'react';
import {
  Col, Row,
} from 'antd';
import moment from 'moment';

export default function OrderInfo({ order }) {
  return (
    <Row>
      <Col span={24}>
        <Row>
          <p>
            Ordered on:&nbsp;
          </p>
          <p>
            {moment(order.order_date.split('T')[0]).format('LL')}
          </p>
          <p>
                      &nbsp;| Order &nbsp;
          </p>
          <p>
            {order.ORDER_order_id}
          </p>
        </Row>
      </Col>
    </Row>
  );
}
