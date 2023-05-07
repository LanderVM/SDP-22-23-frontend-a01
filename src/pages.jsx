import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import React from 'react';
import PageNotFoundAlert from './Components/PageNotFoundAlert';
import ProductsList from './Components/Products/ProductsList';
import SingleProduct from './Components/Products/SingleProduct';
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
  const { productId } = useParams();

  return (
    <main>
      <SingleProduct productId={productId} />
    </main>
  );
}
