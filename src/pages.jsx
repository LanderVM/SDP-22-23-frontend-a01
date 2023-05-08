import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import React from 'react';
import PageNotFoundAlert from './Components/PageNotFoundAlert';
import ProductsList from './Components/products/ProductsList';
import SingleProduct from './Components/products/SingleProduct';
import TrackingInput from './Components/Tracking/TrackingInput';
import ProfileOverview from './Components/profile/ProfileOverview';

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
  const { isAuthenticated } = useAuth0();

  return (
    <main style={{ padding: '1%' }}>
      {isAuthenticated
        ? (
          <ProfileOverview />
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
