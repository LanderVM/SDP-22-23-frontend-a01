import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { List } from 'antd';
import useProducts from '../../api/product';
import Error from '../Error';
import Loader from '../Loader';
import Product from './productElement';
import SideBarProductPage from './SideBarProductPage';

function ProductsListElement({ products, handleView }) {
  if (!products || products.length === 0) {
    return (
      <div>There are no products available</div>
    );
  }

  return (
    <div>
      <List
        bordered
        dataSource={products}
        pagination={{
          align: 'center',
          pageSize: 10,
        }}
        data-cy="test-procducts-list"
        renderItem={(item) => (
          <List.Item key={item.product_id} style={{ display: 'block' }}>
            <Product product={item} onView={handleView} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default function ProductsList() {
  const [producten, setProducten] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(50);
  const [inStock, setInStock] = useState(true);

  const navigate = useNavigate();

  const productenApi = useProducts();

  const callBack = (data) => {
    setPriceStart(data.priceStart);
    setPriceEnd(data.priceEnd);
    setInStock(data.inStock);
  };

  useEffect(() => {
    const fetchProducten = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productenApi.getFiltered(priceStart, priceEnd, inStock);
        setProducten(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchProducten();
  }, [priceStart, priceEnd, inStock]);

  const handleView = useCallback(async (nameToView) => {
    try {
      setError(null);
      await productenApi.getByName(nameToView);
      navigate(`product/${nameToView}`);
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <Container fluid>
      <Row style={{ margin: '3% 0' }}>
        <Col md="3">
          <SideBarProductPage handleCallback={callBack} />
        </Col>
        <Col>
          <Loader loading={loading} />
          <Error error={error} />
          {!loading && !error ? <ProductsListElement products={producten} handleView={handleView} />
            : null}
        </Col>
      </Row>
    </Container>
  );
}
