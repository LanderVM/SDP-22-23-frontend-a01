import React from 'react';
import {
  Col, Row,
} from 'antd';
import moment from 'moment';
import './orderinfo.scss';

export default function OrderInfo({ productList }) {
  return (
    <Row>
      <Col span={24}>
        <Row>
          <p>
            Ordered on:&nbsp;
          </p>
          <p>
            {moment(productList[0].order_date.split('T')[0]).format('LL')}
          </p>
          <p>
                      &nbsp;| Order &nbsp;
          </p>
          <p>
            {productList[0].ORDER_order_id}
          </p>
        </Row>
        {/* TODO move this to seperate component Product & fill up */}
        <Row className="aa">
          <Col>
            <p />
          </Col>
          <Col>
            <p>aa</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
