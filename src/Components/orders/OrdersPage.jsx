import React, { useEffect, useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import {
  Breadcrumb, Col, Layout, Menu, Row,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { RiShoppingBasket2Line } from 'react-icons/ri';
import moment from 'moment';
import useCustomerApi from '../../api/customerService';

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const customerApi = useCustomerApi();

  useEffect(() => {
    const fetchOrders = async () => {
      setOrders(await customerApi.getOrders());
    };
    fetchOrders();
    console.log(orders);
  }, []);

  const items = [
    {
      key: 'sidenav1',
      icon: <UserOutlined />,
      label: 'Account Overview',
      style: { padding: '0', margin: '0' },
    },
    {
      key: 'sidenav2',
      icon: <RiShoppingBasket2Line />,
      label: 'Orders',
      style: { padding: '0', margin: '0' },
    },
  ];

  return (
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ marginTop: '16px' }}>
        <Breadcrumb.Item>Account</Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ background: '#EC48842 !important' }}>
        <Sider style={{ backgroundColor: '#f5f5f5' }} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['sidenav2']}
            style={{ height: '100%', backgroundColor: '#f5f5f5', paddingTop: '15px' }}
            items={items}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <h1 style={{ fontSize: '48px', margin: '0' }}>Orders</h1>
          {orders === null
            ? 'no_orders'
            : orders.items.map((order) => (
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
            ))}
        </Content>
      </Layout>
    </Content>
  );
}
