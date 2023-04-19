import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  HomePage, NotFoundPage, ProductOverviewPage, ProductsPage, ProfilePage, ShoppingCartPage,
} from './pages';
import ScrollToTop from './Contexts/ScrollToTop';
import Footer from './Components/Footer';
import Navibar from './Components/Navibar/Navibar';
import ThankyouScreen from './Components/shoppingCart/ThankyouScreen'
import ShoppingCart from './Components/shoppingCart/ShoppingCart';


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
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/thankyouScreen" elelemnt={<ThankyouScreen/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
