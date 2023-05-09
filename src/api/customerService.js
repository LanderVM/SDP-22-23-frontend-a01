import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import {
  useCallback,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/customers`;

export default function useCustomerApi() {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getOrders = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(`${baseUrl}/orders`, {
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
    await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/${id ?? ''}`,
      data: values,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [getAccessTokenSilently]);

  return {
    getOrders,
    placeOrder,
  };
}
