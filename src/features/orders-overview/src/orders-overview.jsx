import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import {
  Breadcrumb, Empty, Layout, List,
} from 'antd';

import useOrderApi from '../../../api/order-service';
import SideMenu from '../../../Components/side-menu';
import Error from '../../../Components/error';
import Loader from '../../../Components/loader';
import RequireAuth from '../../../Components/authentication/RequireAuth';
import OrderFilter from './order-filter';
import OrderInfo from './order-info';
import '../order-info.css';

export default function OrdersOverview() {
  const [orderList, setOrderList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [statuses, setStatuses] = useState([]);

  const customerApi = useOrderApi();

  const callBack = (data) => {
    setStatuses(data.statusesChecked);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const dbOrderList = await customerApi.getOrders(statuses);
        setOrderList(dbOrderList);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [statuses]);

  return (
    <RequireAuth>
      <main id="orders-page">
        <Content style={{ padding: '0 32px' }}>
          <Breadcrumb style={{ marginTop: '16px' }} items={[{ title: 'Account' }, { title: 'Orders' }]} />
          <Layout>
            <SideMenu selectedKey={['orders']} />
            <Content style={{
              margin: '0 14px',
            }}
            >
              <h1 style={{ fontSize: '48px', margin: '0' }}>Orders</h1>
              <OrderFilter handleCallback={callBack} />
              <Error error={error} />
              {!error
                ? <Loader loading={loading} />
                : null}
              {orderList === null
                ? !loading
                  ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There were no orders found." />
                  : null
                : (
                  <List
                    bordered
                    style={{ backgroundColor: 'white' }}
                    dataSource={Object.keys(orderList.items).reverse()}
                    data-cy="shoppingCart"
                    pagination={{
                      align: 'center',
                      pageSize: 10,
                    }}
                    renderItem={(orderId) => (
                      <List.Item key={orderId} style={{ display: 'block' }}>
                        <OrderInfo order={orderList.items[orderId][0]} />
                      </List.Item>
                    )}
                  />
                )}
            </Content>
          </Layout>
        </Content>
      </main>
    </RequireAuth>
  );
}
