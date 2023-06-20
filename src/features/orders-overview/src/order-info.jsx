import { Button, Col, Row } from 'antd';
import moment from 'moment/moment';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import getStatusAsString from '../../../utils';

export default function OrderInfo({ order }) {
  const { lg, xs } = useBreakpoint();

  return (
    <Row>
      <Col span={24}>
        <Row className="delaware-order-info-body-header" style={{ marginLeft: xs ? '' : '14px', marginTop: xs ? '' : '14px' }}>
          <Col
            span={13}
            lg={13}
            xs={24}
            style={{ marginRight: '1px', marginBottom: '5px' }}
          >
            <h3 style={{ marginLeft: xs ? '19%' : '', marginRight: xs ? '17%' : '' }}>
              Order&nbsp;#
              {order.order_id}
              { xs ? (
                <span className="delaware-order-info-body-header-status" style={{ fontWeight: 'bold' }}>
                &nbsp;
                  {getStatusAsString(order.order_status)}
                </span>
              ) : null }
            </h3>
            <span style={{ marginLeft: xs ? '12%' : '', marginRight: xs ? '17%' : '' }}>
              <span style={{ color: 'grey' }}>Ordered&nbsp;on: </span>
              <span style={{ fontWeight: 'bold' }}>
                {moment(order.order_date.split('T')[0]).format('LL')}
              </span>
              { xs ? null
                : (
                  <p className="delaware-order-info-body-header-status">
                    {getStatusAsString(order.order_status)}
                  </p>
                )}
            </span>
          </Col>
          <Col
            className="delaware-order-info-body"
            span={10}
            lg={10}
            xs={24}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '15px',
              marginBottom: '15px',
            }}
          >
            <NavLink to={`/orders/${order.order_id}`} style={{ marginLeft: lg ? '90%' : '' }}>
              <Button className="delaware-order-info-body-info-button">
                <span>More Info</span>
                <AiOutlineRight />
              </Button>
            </NavLink>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
