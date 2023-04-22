import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import {
  HomePage, NotFoundPage, ProductOverviewPage, ProductsPage, ProfilePage,
} from './pages';
import ScrollToTop from './Contexts/ScrollToTop';
import Navibar from './Components/Navibar/Navibar';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';

function App() {
  return (
    <Layout>
      <Navibar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/product/:id" element={<ProductOverviewPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ScrollToTop />
    </Layout>
  );
}

export default App;
