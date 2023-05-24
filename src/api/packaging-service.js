import { useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const baseUrl = `${process.env.REACT_APP_API_URL}`;
export default function usePackagingApi() {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getPackagingsList = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(`${baseUrl}/packagings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [getAccessTokenSilently]);

  return {
    getPackagingsList,
  };
}
