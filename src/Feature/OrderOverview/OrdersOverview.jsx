import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import {
  Breadcrumb, Layout,
} from 'antd';

import useCustomerApi from '../../api/customerService';
import { OrderInfo } from './index';
import SideMenu from '../../Components/Sider/SideMenu';

export default function OrdersOverview() {
  const [orderList, setOrderList] = useState(null);
  const customerApi = useCustomerApi();

  useEffect(() => {
    const fetchOrders = async () => {
      setOrderList(await customerApi.getOrders());
    };
    fetchOrders();
  }, []);

  return (
    <div className="a">
      <Content style={{ padding: '0 32px' }}>
        <Breadcrumb style={{ marginTop: '16px' }}>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
        </Breadcrumb>
        <Layout>
          <SideMenu />
          <Content style={{
            margin: '0 14px', minHeight: 280,
          }}
          >
            <h1 style={{ fontSize: '48px', margin: '0' }}>Orders</h1>
            {orderList === null
              ? 'no_orders'
              : Object.keys(orderList.items).map((orderId) => <OrderInfo key={orderId} productList={orderList.items[orderId]} />)}
          </Content>
        </Layout>
      </Content>
    </div>
  );
}
