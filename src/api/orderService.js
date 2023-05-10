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

  return {
    getOrders,
    getOrderById,
    updateShippingDetailsById,
  };
}
