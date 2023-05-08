import {
  Button, Col, List, Modal, Row,
} from 'antd';
import '../OrderOverview/orderInfo.scss';
import moment from 'moment';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import getStatusAsString from '../../utils';
import SingleProductInfo from './SingleProductInfo';
import ChangeAddress from './ChangeAddress';

export default function SingleOrderInfo({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '24px' : '16px';
  const fontSizeDesc = lg ? '18px' : '14px';

  /* const calculateTotalCost = useMemo(() => {
    const totalCost = order.product_list.map((product) => product.product_count * product.original_acquisition_price).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    return totalCost;
  }); */
  // TODO de code werkt maar bij de initiele render wordt de data niet snel genoeg opgehaald waardoor er een errror ontstaat

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          data-cy="SingleOrderProductsList"
          renderItem={(item) => (
            <List.Item key={item.product_id} style={{ display: 'block' }}>
              <SingleProductInfo product={item} />
            </List.Item>
          )}
        />
        <Row>
          <h1 style={{ fontSize: fontSizeName }}>Order details</h1>

        </Row>
        <Row style={{ display: 'inline-flex', fontSize: fontSizeDesc, columnGap: '40px' }}>
          <Col xs={{ span: 12 }} lg={{ span: 4 }}>
            <h1>Delivery adress</h1>
            <div>
              <p>
                {order.order_info.delivery_street}
&nbsp;
                {order.order_info.delivery_house_number}
              </p>
              <p>
                {order.order_info.delivery_postal_code}
                    &nbsp;
                {order.order_info.delivery_city}
              </p>
              <p>
                {order.order_info.delivery_country}
              </p>
              <Button type="link" onClick={showModal}> &#62;&nbsp;Change address</Button>
              <Modal
                title="Change address"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <ChangeAddress />
              </Modal>
            </div>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 4 }}>
            <h1>Packaging</h1>
            <div>{order.order_info.name}</div>
            <Button type="link" onClick={showModal}> &#62;&nbsp;Change packaging</Button>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 4 }}>
            <h1>Total amount: </h1>
            <NavLink to="/track">
              &#62;&nbsp;Track order
            </NavLink>

          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 4 }}>
            <h1>
              €&nbsp;
              444444
            </h1>

          </Col>
        </Row>

      </Col>
    </Row>
  );
}
