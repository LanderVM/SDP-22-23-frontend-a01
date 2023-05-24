import { Content } from 'antd/es/layout/layout';
import { Breadcrumb, Layout } from 'antd';

import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import SideMenu from '../../Components/Sider/SideMenu';
import useOrderApi from '../../api/orderService';
import Error from '../../Components/Error';
import Loader from '../../Components/Loader';
import OrderInfoHeader from './src/order-info-header';
import RequireAuth from '../../Components/authentication/RequireAuth';
import './single-product-info.scss';

export default function SingleOrderOverview() {
  const { orderId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const customerApi = useOrderApi();

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
    <RequireAuth>
      <Content style={{ padding: '0 32px' }}>
        <Breadcrumb style={{ marginTop: '16px' }} items={[{ title: 'Account' }, { title: 'Orders' }]} />
        <Layout>
          <SideMenu selectedKey={['orders']} />
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
            <OrderInfoHeader order={order} />
          </Content>
        </Layout>
      </Content>
    </RequireAuth>
  );
}
