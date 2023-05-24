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

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();

    const { data } = await axios.get(`${baseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, []);

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

  const saveNotification = useCallback(async (notification) => {
    const token = await getAccessTokenSilently();

    await axios({
      method: 'PUT',
      url: `${baseUrl}`,
      data: notification,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  const saveMultipleToUnread = useCallback(async (array) => {
    const token = await getAccessTokenSilently();
    await axios({
      method: 'PUT',
      url: `${baseUrl}/updateToUnread`,
      data: array,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  return {
    getAmountNotRead, getAll, getFiveMostRecent, saveNotification, saveMultipleToUnread,
  };
}
