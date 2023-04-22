import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import Error from '../Error';
import Loader from '../Loader';
import useProducts from '../../api/product';
import ShoppingCartContentElement from './ShoppingCartContent';
import ShoppingCartOverview from './ShoppingCartOverview';

export default function ShoppingCart() {
  const [myCart, setMyCart] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const productenApi = useProducts();

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await productenApi.getAll();
        setMyCart(data);
      } catch (error) {
        setErrorMsg(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  const handleRemove = useCallback(async (id) => {
    await setMyCart(myCart.filter((el) => el.id !== id));
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <Error error={errorMsg} />
      <div className="container">
        <div className="row">

          <div className="col" style={{ maxWidth: '70%', margin: '5%', border: '1px solid black' }}>
            <h1>Shopping Cart</h1>
            {!loading && !errorMsg ? myCart.map((cartEl) => (
              <ShoppingCartContentElement key={cartEl.product_id} cart={cartEl} handleRemove={handleRemove} />
            )) : null}
          </div>

          <div
            className="col"
            style={{
              maxWidth: '20%', margin: '5%',
            }}
          >

            <ShoppingCartOverview cart={myCart} />
          </div>
        </div>
      </div>
    </>
  );
}
