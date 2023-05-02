import { useEffect, useState } from 'react';
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
    <div>
      {orders === null ? '' : orders.items.map((order) => <p>{order.order_id}</p>)}
    </div>
  );
}
