import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/orders`;

const useOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const save = useCallback(async (order) => {
    try {
      const token = await getAccessTokenSilently();

      console.log(`POST to ${baseUrl}`);
      const result = await axios({
        method: 'POST',
        url: baseUrl,
        data: order,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return null; // TODO temporary to make ESLint happy
    }
  }, [getAccessTokenSilently]);

  const getOrders = useCallback(async () => {
    const token = await getAccessTokenSilently();

    const { data } = await axios.get(`${baseUrl}/byCustomer/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);

  return { save, getOrders };
};

export default useOrders;
