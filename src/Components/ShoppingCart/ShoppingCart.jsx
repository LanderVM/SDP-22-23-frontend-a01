import React, {

  useContext, useEffect,
  useState,
} from 'react';
import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';
import Error from '../Error';
import Loader from '../Loader';
import ShoppingCartContent from './ShoppingCartContent';
import ShoppingCartOverview from './ShoppingCartOverview';

export default function ShoppingCart() {
  const {
    productsFromContext, addProductToShoppingCartContext,
  } = useContext(ProductsForShoppingCartContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [myCart, setCart] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        setError(null);
        await setCart(productsFromContext);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [productsFromContext]);

  return (

    <div className="container">
      <div className="row">
        <td width="200px">
          <input type="button" defaultValue="add" onClick={addProductToShoppingCartContext} />
        </td>
        <Loader loading={loading} />
        <Error error={error} />
        <div className="col" style={{ maxWidth: '70%', margin: '5%', border: '1px solid black' }}>
          <h1>Shopping Cart</h1>
          {!error && !loading ? myCart.map((cartEl) => (
            <ShoppingCartContent key={cartEl.product_id} cart={cartEl} context={ProductsForShoppingCartContext} />
          )) : null}

        </div>

        <div
          className="col"
          style={{
            maxWidth: '20%', margin: '5%',
          }}
        >
          {myCart ? <ShoppingCartOverview cart={myCart} /> : null}

        </div>
      </div>
    </div>
  );
}
