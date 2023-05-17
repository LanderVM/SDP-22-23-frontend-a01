import {
  Col, List, Row,
} from 'antd';
import moment from 'moment';
import React from 'react';
import getStatusAsString from '../../utils';
import SingleProductInfo from './SingleProductInfo';
import SingleOrderDetails from './SingleOrderDetails';

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
            <p className="delaware-order-info-body-header-status">
              {getStatusAsString(order.order_info.order_status)}
            </p>
          </Col>
        </Row>
        <List
          bordered
          style={{ backgroundColor: 'white', margin: '14px 10px 10px 10px' }}
          dataSource={order.product_list}
          pagination={{
            align: 'center',
            pageSize: 10,
          }}
          data-cy="SingleOrderProductsList"
          renderItem={(item) => (
            <List.Item key={item.product_id} style={{ display: 'block' }}>
              <SingleProductInfo product={item} />
            </List.Item>
          )}
        />
        <SingleOrderDetails order={order} />
      </Col>
    </Row>
  );
}
