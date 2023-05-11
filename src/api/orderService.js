import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import {
  useCallback,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}`;

export default function useOrderApi() {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getOrders = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(`${baseUrl}/customers/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [getAccessTokenSilently]);

  const getOrderById = useCallback(async (orderId) => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(`${baseUrl}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [getAccessTokenSilently]);

  const updateShippingDetailsById = useCallback(async (orderId, shippingDetails) => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.put(`${baseUrl}/orders/`, { order_id: orderId, ...shippingDetails }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [getAccessTokenSilently]);

  const placeOrder = useCallback(async (order) => {
    const token = await getAccessTokenSilently();
    const {
      id,
      ...values
    } = order;
    const values2 = values.order_lines.map((e) => {
      const { productId, amount } = e;
      return {
        PRODUCT_product_id: productId,
        product_count: amount,
      };
    });
    const values3 = {
      ...values,
      order_lines: values2,
    };

    console.log(values3);
    await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/orders/${id ?? ''}`,
      data: values3,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [getAccessTokenSilently]);

  return {
    getOrders,
    getOrderById,
    updateShippingDetailsById,
    placeOrder,
  };
}
