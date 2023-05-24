import React from 'react';
import PageNotFoundAlert from './Components/page-not-found-alert';
import NotificationsOverview from './features/notifications';

export function NotFoundPage() {
  return (
    <main>
      <PageNotFoundAlert />
    </main>
  );
}

export function Notifications() {
  return (
    <div>
      <NotificationsOverview />
    </div>
  );
}
