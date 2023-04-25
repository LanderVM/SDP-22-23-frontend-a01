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
    const {
      data,
    } = await axios.get(`${baseUrl}/id/${id}`);
    return data;
  }, []);

  const getByName = useCallback(async (name) => {
    const {
      data,
    } = await axios.get(`${baseUrl}/name/${name}`);
    return data;
  }, []);

  const getFiltered = useCallback(async (priceStart, priceEnd, inStock) => {
    const {
      data,
    } = await axios.get(`${baseUrl}/filter?startPrice=${priceStart}&endPrice=${priceEnd}&inStock=${inStock}`);
    return data.items;
  }, []);

  return {
    getAll,
    getById,
    getByName,
    getFiltered,
  };
};

export default useProducts;
