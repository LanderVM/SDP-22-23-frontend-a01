import React, {

  useContext,
  useState,
} from 'react';
import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';
import Error from '../Error';
import ShoppingCartContent from './ShoppingCartContent';
import ShoppingCartOverview from './ShoppingCartOverview';

export default function ShoppingCart() {
  const {
    productsFromContext,
  } = useContext(ProductsForShoppingCartContext);

  const [error] = useState(null);

  const [myCart] = useState(productsFromContext);

  return (

    <div className="container">
      <div className="row">

        <Error error={error} />
        <div className="col" style={{ maxWidth: '70%', margin: '5%', border: '1px solid black' }}>
          <h1>Shopping Cart</h1>
          {!error ? myCart.map((cartEl) => (
            <ShoppingCartContent key={cartEl.product_id} cart={cartEl} context={ProductsForShoppingCartContext} />
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
  );
}
