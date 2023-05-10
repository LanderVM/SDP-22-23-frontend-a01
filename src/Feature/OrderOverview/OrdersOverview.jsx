import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { Breadcrumb, Empty, Layout } from 'antd';

import useOrderApi from '../../api/orderService';
import SideMenu from '../../Components/Sider/SideMenu';
import Error from '../../Components/Error';
import Loader from '../../Components/Loader';
import { OrderInfo } from './index';

export default function OrdersOverview() {
  const [orderList, setOrderList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const customerApi = useOrderApi();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const dbOrderList = await customerApi.getOrders();
        setOrderList(dbOrderList);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
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
            margin: '0 14px',
          }}
          >
            <h1 style={{ fontSize: '48px', margin: '0' }}>Orders</h1>
            <Error error={error} />
            {!error
              ? <Loader loading={loading} />
              : null}
            {orderList === null
              ? !loading
                ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There were no orders found." />
                : null
              : Object.keys(orderList.items).reverse().map((orderId) => (
                <OrderInfo
                  key={orderId}
                  productList={orderList.items[orderId]}
                />
              ))}
          </Content>
        </Layout>
      </Content>
    </div>
  );
}
