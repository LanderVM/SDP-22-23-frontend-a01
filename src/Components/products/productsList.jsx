import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../api/product';
import Error from '../Error';
import Loader from '../Loader';
import Product from './productElement';

function ProductsListElement({ products, handleView }) {
  if (!products || products.length === 0) {
    return (
      <div>There are no products available</div>
    );
  }

  return (
    <div className="row align-items-start" style={{ margin: '5%' }}>
      {products.map((product, pKey) => (
        <div className="card border border-danger border-2" style={{ width: '300px', margin: '50px' }}>
          {/* TODO dit mag niet op deze manier gedaan worden! */}
          {/* eslint-disable-next-line react/no-array-index-key */}
          <Product key={pKey} product onView={handleView} />
        </div>
      ))}
    </div>
  );
}

export default function ProductsList() {
  const [producten, setProducten] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const productenApi = useProducts();

  useEffect(() => {
    const fetchProducten = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await productenApi.getAll();
        setProducten(data);
      } catch (error) {
        setErrorMsg(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducten();
  }, []);

  const handleView = useCallback(async (idToView) => {
    try {
      setErrorMsg(null);
      await productenApi.getById(idToView);
      navigate(`product/${idToView}`);
    } catch (err) {
      setErrorMsg(err);
    }
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <Error error={errorMsg} />
      {!loading && !errorMsg
        ? <ProductsListElement products={producten} handleView={handleView} />
        : null}
    </>
  );
}
