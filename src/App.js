import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import {HomePage, NotFoundPage} from "./pages";
import ProductsPage from "./Pages/ProductsPage";
import ProfilePage from "./Pages/ProfilePage";
import ScrollToTop from "./Pages/ScrollToTop";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import { SingleProductPage } from "./Pages/SingleProductPage"

function App() {
  return (
    <>
    <Header />
    <ScrollToTop/>
    <Routes>
      <Route index element={<HomePage />}/>
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/product/:id" element={<SingleProductPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/shoppingCart" element={<ShoppingCartPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </>
  );
}

export default App;
