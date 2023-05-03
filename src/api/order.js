import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/product`;

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
      return null;
    }
  }, [getAccessTokenSilently]);

  return { save };
};

export default useOrders;
