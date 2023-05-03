import React, { useEffect, useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import {
  Breadcrumb, Layout, Menu,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { RiShoppingBasket2Line } from 'react-icons/ri';
import useCustomerApi from '../api/customerService';
import OrderInfo from '../Feature/OrderOverview';

export default function OrdersOverview() {
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
              <OrderInfo order={order} />
            ))}
        </Content>
      </Layout>
    </Content>
  );
}
