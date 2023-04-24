import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import React, { useContext, useEffect, useState } from 'react';
import PageNotFoundAlert from './Components/PageNotFoundAlert';
import ProductsList from './Components/products/productsList';
import SingleProduct from './Components/products/singleProduct';
import { ProductsForShoppingCartContext } from './Contexts/ProductsForShoppingCartContext';
import useProducts from './api/product';
import ProductsTable from './Components/products/ProductsTable';
import TrackingInput from './Components/Tracking/TrackingInput';

export function HomePage() {
  return (
    <main />
  );
}

export function NotFoundPage() {
  return (
    <main>
      <PageNotFoundAlert />
    </main>
  );
}

export function ProductsPage() {
  return (
    <main>
      <ProductsList />
    </main>
  );
}

export function TrackingPage() {
  return (
    <main>
      <TrackingInput />
    </main>
  );
}

export function ProfilePage() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <main>
      {isAuthenticated
        ? (
          <div>
            Name:
            {user.email}
          </div>
        )
        : <div />}
    </main>
  );
}

export function ProductOverviewPage() {
  const { name } = useParams();

  return (
    <main>
      <SingleProduct name={name} />
    </main>
  );
}

export function ShoppingCartPage() {
  const [products, setProducts] = useState([]);
  const { productsFromContext } = useContext(ProductsForShoppingCartContext);
  const productsApi = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productsApi.getAll();
      data.filter((el) => productsFromContext.forEach((item) => item.productId === el.id));
      setProducts(data);
    };
    fetchProducts();
  }, [productsApi, productsFromContext]);

  return (
    <>
      <h1>Welcome to your shopping-cart!</h1>
      {products.length === 0 ? <p>There are no items in you shopping cart yet!</p> : <ProductsTable products="products" />}
    </>
  );
}
