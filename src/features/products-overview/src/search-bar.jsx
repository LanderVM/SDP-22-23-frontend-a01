import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  Button,
} from 'antd';
import useProducts from '../../../api/productService';

function SearchBar({
  handleSearch, priceStart, priceEnd, inStock, brand, category,
}) {
  const productsApi = useProducts();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const onSearchName = () => {
    if (selectedProduct || selectedProduct === '') {
      handleSearch({ name: selectedProduct });
    }
  };

  return (
    <div style={{ margin: '25px 0' }}>
      {!loading && !error ? (
        <div style={{ display: 'flex', fontSize: '30px' }}>
          <AutoComplete
            data-cy="products_searchBar"
            style={{ width: '100%' }}
            options={products.map((e) => ({ value: e.name }))}
            filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            onSearch={setSelectedProduct}
            onSelect={setSelectedProduct}
          />
          <Button
            data-cy="products_searchButton"
            onClick={onSearchName}
            style={{ float: 'right', backgroundColor: '#ff4d4f', color: 'white' }}
          >
            <b>Search for Product</b>
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(SearchBar);
