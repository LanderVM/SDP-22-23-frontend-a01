import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  Button,
  Row,
  Col,
} from 'antd';
import useProducts from '../../api/productService';

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
    <div>
      {!loading && !error ? (
        <Row style={{ margin: '25px 0' }}>
          <Col span={18}>
            <AutoComplete
              style={{ width: '100%' }}
              options={products.map((e) => ({ value: e.name }))}
              filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              onSearch={setSelectedProduct}
              onSelect={setSelectedProduct}
            />
          </Col>
          <Col span={6}>
            <Button
              data-cy="products_searchBar"
              onClick={onSearchName}
              style={{ width: '100%' }}
            >
              Search for Product
            </Button>
          </Col>
        </Row>
      ) : null}
    </div>
  );
}

export default React.memo(SearchBar);
