import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import useProducts from '../../api/productService';
import Error from '../Error';
import Loader from '../Loader';

function SearchBar({
  handleSearch, priceStart, priceEnd, inStock, brand, category,
}) {
  const productsApi = useProducts();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsApi.getFiltered(priceStart, priceEnd, inStock, brand, category);
        setProducts(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [priceStart, priceEnd, inStock, brand, category]);

  const [name, setName] = useState(null);

  useEffect(() => {
    handleSearch({ name });
  }, [name]);

  const onSearchName = (value) => {
    setName(value);
  };

  return (
    <div>
      <Loader loading={loading} />
      <Error error={error} />
      {!loading && !error
        ? (
          <div style={{ margin: '25px 0' }}>
            <AutoComplete
              style={{ width: '100%' }}
              options={products.map((e) => ({ value: e.name }))}
              filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            >
              <Input.Search data-cy="products_searchBar" placeholder="iPhone 9" enterButton="Search for Product" size="large" onSearch={onSearchName} />
            </AutoComplete>
          </div>
        ) : null}
    </div>

  );
}

export default React.memo(SearchBar);
