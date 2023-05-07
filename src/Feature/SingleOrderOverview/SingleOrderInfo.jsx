import React from 'react';
import { Col, List, Row } from 'antd';
import moment from 'moment';
// import SingleProductInfo from './SingleProductInfo';

import getStatusAsString from '../../utils';
import SingleProductInfo from './SingleProductInfo';

export default function SingleOrderInfo({ productList }) {
  return (
    <Row>
      <Col span={24}>
        <Row className="delaware-order-info-body-header">
          <Col span={23}>

            <span style={{ color: 'grey' }}>Ordered on: </span>
            <span style={{ fontWeight: 'bold' }}>
              {' '}
              {moment(productList[0].order_date.split('T')[0]).format('LL')}
            </span>

          </Col>
        </Row>

        <List
          bordered
          style={{ backgroundColor: 'white' }}
          dataSource={productList}
          data-cy="shoppingCart"
          renderItem={(item) => (
            <List.Item key={item.productId} style={{ display: 'block' }}>

              <SingleProductInfo
                product={productList[0]}
                key={`${productList[0].order_id}_${productList[0].product_id}}`}
              />

            </List.Item>
          )}
        />

        <p className="delaware-order-info-body-header-status">
          {getStatusAsString(productList.order_status)}
        </p>

      </Col>
    </Row>
  );
}
