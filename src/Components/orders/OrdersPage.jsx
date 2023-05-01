import useOrders from '../../api/order';

const getOrders = () => {
  const data = useOrders.getOrders();
  console.log(data);
};

export default function OrdersPage() {
  return (
    <div>
      <button type="button" onClick={getOrders}>click</button>
    </div>
  );
}
