import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
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
    <div className="row align-items-start" style={{ margin: '2% 4%' }}>
      {products.map((product) => (
        <div className="card border border-danger border-2" style={{ width: '300px', margin: '50px' }}>
          <Product key={product.product_id} product={product} onView={handleView} />
        </div>
      ))}
    </div>
  );
}

export default function ProductsList() {
  const [producten, setProducten] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [price, setPrice] = useState(50);
  const [inStock, setInStock] = useState(false);

  const navigate = useNavigate();

  const productenApi = useProducts();

  function CallBack(data) {
    setPrice(data.price);
    setInStock(data.inStock);
  }

  useEffect(() => {
    const fetchProducten = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productenApi.getFiltered(price, inStock);
        setProducten(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchProducten();
  }, [price, inStock]);

  const handleView = useCallback(async (idToView) => {
    try {
      setError(null);
      await productenApi.getById(idToView);
      navigate(`product/${idToView}`);
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md="3" style={{ margin: '3% 0' }}>
          <SideBarProductPage handleCallback={CallBack} />
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
