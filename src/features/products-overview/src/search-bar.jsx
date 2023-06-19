import React, { useState } from 'react';
import {
  AutoComplete,
  Button,
} from 'antd';

function SearchBar({
  handleSearch, productNames,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const onSearchName = () => {
    if (selectedProduct || selectedProduct === '') {
      handleSearch({ name: selectedProduct });
    }
  };

  return (
    <div style={{ marginBottom: '25px', borderTopRightRadius: '0', borderBottomRightRadius: '0' }}>
      <div style={{
        display: 'flex', fontSize: '30px', borderTopRightRadius: '0', borderBottomRightRadius: '0',
      }}
      >
        <AutoComplete
          id="autoco"
          data-cy="products_searchBar"
          style={{ width: '100%', borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
          size="large"
          options={productNames.map((e) => ({ value: e.name }))}
          filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          onSearch={setSelectedProduct}
          onSelect={setSelectedProduct}
        />
        <Button
          data-cy="products_searchButton"
          onClick={onSearchName}
          style={{
            float: 'right', backgroundColor: '#ff4d4f', color: 'white', borderTopLeftRadius: '0', borderBottomLeftRadius: '0',
          }}
          size="large"
        >
          <b>Search for Product</b>
        </Button>
      </div>
    </div>
  );
}

export default React.memo(SearchBar);
