import { useEffect, useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import useCustomerApi from '../../api/customerService';

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const customerApi = useCustomerApi();

  useEffect(() => {
    const fetchOrders = async () => {
      setOrders(await customerApi.getOrders());
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Sider />
      <Content>
        {orders === null ? '' : orders.items.map((order) => <p>{order.order_id}</p>)}

      </Content>
    </>
  );
}
