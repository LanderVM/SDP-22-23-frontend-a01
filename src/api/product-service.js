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
    } = await axios.get(`${baseUrl}/ids?productId=${productId}`);
    return data;
  }, []);

  const getByIds = useCallback(async (productId) => {
    const url = new URLSearchParams();
    if (productId.length > 0) productId.map((id) => url.append('productId', id.productId));

    const {
      data,
    } = await axios.get(`${baseUrl}/ids?${url.toString()}`);
    return data.items;
  }, []);

  const getBrands = useCallback(async () => {
    const {
      data,
    } = await axios.get(`${baseUrl}/brands`);
    return data.items;
  }, []);

  const getCategories = useCallback(async () => {
    const {
      data,
    } = await axios.get(`${baseUrl}/categories`);
    return data.items;
  }, []);

  const getFiltered = useCallback(async (minPrice, maxPrice, inStock, brands, categories, sortBy, name) => {
    const url = new URLSearchParams();

    try {
      if (name) url.append('name', name);
      if (minPrice) url.append('startPrice', minPrice);
      if (maxPrice) url.append('endPrice', maxPrice);
      if (inStock !== undefined) url.append('inStock', inStock);
      if (brands) if (brands.length > 0) brands.map((c) => url.append('brand', c));
      if (categories) if (categories.length > 0) categories.map((b) => url.append('category', b));
      if (sortBy) url.append('sortBy', sortBy);
    } catch (error2) {
      throw new Error(`Something whent wrong while trying to fetch products ${error2}`);
    }

    const {
      data,
    } = await axios.get(`${baseUrl}?${url.toString()}`);
    return data.items;
  }, []);

  const getPopular = useCallback(async () => {
    const {
      data,
    } = await axios.get(`${baseUrl}/popular`);
    return data.items;
  }, []);

  return {
    getAll,
    getById,
    getByIds,
    getBrands,
    getCategories,
    getFiltered,
    getPopular,
  };
};

export default useProducts;
