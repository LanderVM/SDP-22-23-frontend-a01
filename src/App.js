import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import {
  NotFoundPage, ProductOverviewPage, ProductsPage, Notifications,
} from './pages';
import ScrollToTop from './Contexts/ScrollToTop';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
import AuthLanding from './Components/authentication/AuthLanding';
import SingleOrderOverview from './features/single-order-overview';
import ProfileOverview from './Components/profile/ProfileOverview';
import FooterElement from './Components/Footer';
import './App.css';
import Navbar from './Components/navbar';
import OrdersOverview from './features/orders-overview';
import PlaceOrder from './features/place-order';
import TrackingInput from './features/Tracking';

function App() {
  return (
    <Layout>
      <Navbar />
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm, token: { colorPrimary: '#EC4242' } }}>
        <Routes>
          <Route index element={<ProductsPage />} />
          <Route path="/home" element={<ProductsPage />} />
          <Route path="/track/:trackingCode?/:verificationCode?" element={<TrackingInput />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductOverviewPage />} />
          <Route path="/profile" element={<ProfileOverview />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
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
