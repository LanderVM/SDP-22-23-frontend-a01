import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useProducts from '../../../api/productService';
import SingleProductBody from './single-product-body';
import Loader from '../../../Components/loader';
import Error from '../../../Components/error';
import PageNotFound from '../../../Components/page-not-found-alert';

function SingleProductE({ product }) {
  if (!product) {
    return (
      <PageNotFound />
    );
  }

  return (
    <main style={{ margin: '50px 10%' }}>
      <SingleProductBody product={product.items[0]} />
    </main>
  );
}

export default function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const productsApi = useProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await productsApi.getById(productId);
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
    <main>
      <Loader loading={loading} />
      <Error error={errorMsg} />
      {!loading && !errorMsg ? <SingleProductE product={product} /> : null}
    </main>
  );
}
