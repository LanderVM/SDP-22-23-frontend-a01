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
    let brandString = '';
    let categoryString = '';
    if (brand !== undefined) {
      brandString = brand.map((e) => `&brand=${e}`).join('');
    }
    if (category !== undefined) {
      categoryString = category.map((e) => `&category=${e}`).join('');
    }
    console.log(`${baseUrl}/filter?startPrice=${priceStart}&endPrice=${priceEnd}&inStock=${inStock}${brandString}${categoryString}`);
    const {
      data,
    } = await axios.get(`${baseUrl}/filter?startPrice=${priceStart}&endPrice=${priceEnd}&inStock=${inStock}${brandString}${categoryString}`);
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
