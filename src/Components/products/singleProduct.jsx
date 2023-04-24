import React, { useState, useEffect } from 'react';
import useProducts from '../../api/product';
import SingleProductElement from './singleProductElement';
import Loader from '../Loader';
import Error from '../Error';

function SingleProductE({ product }) {
  if (!product) {
    return (
      <div>
        something went wrong
      </div>
    );
  }

  return (
    <div style={{ margin: '100px 10%' }}>
      <SingleProductElement product={product.items} />
    </div>
  );
}

export default function SingleProduct({ name }) {
  const [product, setProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const productenApi = useProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await productenApi.getByName(name);
        setProduct(data);
      } catch (error) {
        setErrorMsg(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <Error error={errorMsg} />
      {!loading && !errorMsg ? <SingleProductE product={product} /> : null}
    </>
  );
}
