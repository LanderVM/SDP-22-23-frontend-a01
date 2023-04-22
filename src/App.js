import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  HomePage, NotFoundPage, ProductOverviewPage, ProductsPage, ProfilePage,
} from './pages';
import ScrollToTop from './Contexts/ScrollToTop';
import Navibar from './Components/Navibar/Navibar';

function App() {
  return (
    <>
      <Navibar />
      <ScrollToTop />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/product/:id" element={<ProductOverviewPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
