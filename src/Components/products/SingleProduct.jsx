import React, { useState, useEffect } from 'react';
import useProducts from '../../api/productService';
import SingleProductElement from './SingleProductElement';
import Loader from '../loader';
import Error from '../error';

function SingleProductE({ product }) {
  if (!product) {
    return (
      <div>
        something went wrong
      </div>
    );
  }

  return (
    <div style={{ margin: '50px 10%' }}>
      <SingleProductElement product={product.items[0]} />
    </div>
  );
}

export default function SingleProduct({ productId }) {
  const [product, setProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const productenApi = useProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await productenApi.getById(productId);
        setProduct(data);
      } catch (error) {
        setErrorMsg(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <>
      <Loader loading={loading} />
      <Error error={errorMsg} />
      {!loading && !errorMsg ? <SingleProductE product={product} /> : null}
    </>
  );
}
