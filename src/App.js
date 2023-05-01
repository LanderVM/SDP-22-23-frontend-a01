import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import {
  HomePage, NotFoundPage, ProductOverviewPage, ProductsPage, ProfilePage, TrackingPage,
} from './pages';
import ScrollToTop from './Contexts/ScrollToTop';
import Navibar from './Components/Navibar/Navibar';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
import OrdersPage from './Components/orders/OrdersPage';

function App() {
  return (
    <Layout>
      <Navibar />
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm, token: { colorPrimary: '#EC4242' } }}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/track" element={<TrackingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/product/:name" element={<ProductOverviewPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ConfigProvider>
      <ScrollToTop />
    </Layout>
  );
}

export default App;
