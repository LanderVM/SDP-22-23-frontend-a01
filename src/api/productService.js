import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/products`;

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

  const getById = useCallback(async (productId) => {
    const {
      data,
    } = await axios.get(`${baseUrl}/id/${productId}`);
    return data;
  }, []);

  const getByName = useCallback(async (name) => {
    const {
      data,
    } = await axios.get(`${baseUrl}/name/${name}`);
    return data;
  }, []);

  const getFiltered = useCallback(async (priceStart, priceEnd, inStock, brand, category) => {
    const url = new URLSearchParams();

    if (priceStart !== undefined) url.append('startPrice', priceStart);
    if (priceEnd !== undefined) url.append('endPrice', priceEnd);
    if (inStock !== undefined) url.append('inStock', inStock);
    if (brand.length > 0) brand.map((c) => url.append('brand', c));
    if (category.length > 0) category.map((b) => url.append('category', b));

    const {
      data,
    } = await axios.get(`${baseUrl}/filter?${url.toString()}`);
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
