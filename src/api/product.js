import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/product`;

const useProducts = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently(); 
    const {
      data,
    } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);

  const getById = useCallback(async (id) => {
    const token = await getAccessTokenSilently(); 
    const {
      data,
    } = await axios.get(`${baseUrl}/productId/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });
    return data;
  }, [getAccessTokenSilently]);

  return {
    getAll,
    getById,
  }
}

export default useProducts
