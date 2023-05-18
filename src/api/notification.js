import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import {
  useCallback,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/notifications`;

export default function useNotifications() {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getAmountNotRead = useCallback(async () => {
    const token = await getAccessTokenSilently();

    const { data } = await axios.get(`${baseUrl}/amountNotRead`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.count;
  }, [getAccessTokenSilently]);

  const getFiveMostRecent = useCallback(async () => {
    const token = await getAccessTokenSilently();

    const { data } = await axios.get(`${baseUrl}/fiveMostRecent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const toReturn = data.items;

    return toReturn;
  }, []);

  return { getAmountNotRead, getFiveMostRecent };
}
