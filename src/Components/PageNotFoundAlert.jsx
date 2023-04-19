import { useLocation } from 'react-router';
import React from 'react';

export default function PageNotFoundAlert() {
  const { pathName } = useLocation;

  return (
    <>
      <div>Page not found!</div>
      <div>
        There is no page with url
        {pathName}
      </div>
    </>
  );
}
