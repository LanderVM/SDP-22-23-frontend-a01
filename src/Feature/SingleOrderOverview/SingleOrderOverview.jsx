import { Content } from 'antd/es/layout/layout';
import { Breadcrumb, Layout } from 'antd';

import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import SideMenu from '../../Components/Sider/SideMenu';
import useCustomerApi from '../../api/customerService';
import Error from '../../Components/Error';
import Loader from '../../Components/Loader';
import SingleOrderInfo from './SingleOrderInfo';

export default function SingleOrderOverview() {
  const { orderId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const customerApi = useCustomerApi();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const dbOrder = await customerApi.getOrderById(orderId);

        setOrder(dbOrder);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  return (
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
          <h1 style={{ fontSize: '48px', margin: '0' }}>
            Order
            {order === null ? '' : ` #${order.order_info.order_id}`}
          </h1>
          <Error error={error} />
          {!error
            ? <Loader loading={loading} />
            : null}
          <SingleOrderInfo order={order} />
        </Content>
      </Layout>
    </Content>
  );
}
