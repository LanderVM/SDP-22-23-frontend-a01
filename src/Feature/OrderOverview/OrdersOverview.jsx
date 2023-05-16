import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import {
  Breadcrumb, Empty, Layout, List,
} from 'antd';

import useOrderApi from '../../api/orderService';
import SideMenu from '../../Components/Sider/SideMenu';
import Error from '../../Components/Error';
import Loader from '../../Components/Loader';
import { OrderInfo } from './index';
import RequireAuth from '../../Components/authentication/RequireAuth';
import OrderFilter from './OrderFilter';

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
      <Content style={{ padding: '0 32px' }}>
        <Breadcrumb style={{ marginTop: '16px' }} items={[{ title: 'Account' }, { title: 'Orders' }]} />
        <Layout>
          <SideMenu selectedKey={['orders']} />
          <Content style={{
            margin: '0 14px',
          }}
          >
            <OrderFilter handleCallback={callBack} />
            <h1 style={{ fontSize: '48px', margin: '0' }}>Orders</h1>
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
                    <OrderInfo
                      key={orderId}
                      productList={orderList.items[orderId]}
                    />
                  )}
                />
              )}
          </Content>
        </Layout>
      </Content>
    </RequireAuth>
  );
}
