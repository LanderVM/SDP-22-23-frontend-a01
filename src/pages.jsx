import { useParams } from 'react-router';
import React from 'react';
import PageNotFoundAlert from './Components/PageNotFoundAlert';
import ProductsList from './Components/products/ProductsList';
import SingleProduct from './Components/products/SingleProduct';
import TrackingInput from './Components/Tracking/TrackingInput';
import ProfileOverview from './Components/profile/ProfileOverview';
import FinishingOrder from './Feature/FinishingOrder/FinishingOrder';
import MostRecentNotifications from './Components/notifications/MostRecentNotifications';

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
  return (
    <main>
      <ProfileOverview />
    </main>
  );
}

export function FinishingOrderPage() {
  return (
    <main>
      <FinishingOrder />
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

export function Notifications() {
  return (
    <div>
      <MostRecentNotifications />
    </div>
  );
}
