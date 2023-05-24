import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import {
  NotFoundPage, Notifications,
} from './pages';
import ScrollToTop from './contexts/scroll-to-top';
import ShoppingCart from './features/shopping-cart-overview';
import AuthLanding from './Components/authentication/AuthLanding';
import SingleOrderOverview from './features/single-order-overview';
import Profile from './features/profile';
import FooterElement from './Components/footer';
import './App.css';
import Navbar from './Components/navbar';
import OrdersOverview from './features/orders-overview';
import PlaceOrder from './features/place-order';
import TrackingInput from './features/track-order';
import ProductsOverview from './features/products-overview';
import SingleProduct from './features/single-product-overview';

function App() {
  return (
    <Layout>
      <Navbar />
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm, token: { colorPrimary: '#EC4242' } }}>
        <Routes>
          <Route index element={<ProductsOverview />} />
          <Route path="/home" element={<ProductsOverview />} />
          <Route path="/products" element={<ProductsOverview />} />
          <Route path="/track/:trackingCode?/:verificationCode?" element={<TrackingInput />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<PlaceOrder />} />
          <Route path="/orders" element={<OrdersOverview />} />
          <Route path="/login" element={<AuthLanding />} />
          <Route path="/orders/:orderId" element={<SingleOrderOverview />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ConfigProvider>
      <FooterElement />
      <ScrollToTop />
    </Layout>
  );
}

export default App;
