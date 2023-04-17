import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import {HomePage, NotFoundPage, ProductOverviewPage, ProductsPage, ProfilePage, ShoppingCartPage} from "./pages";
import ScrollToTop from "./Contexts/ScrollToTop";

function App() {
  return (
    <>
    <Header />
    <ScrollToTop/>
    <Routes>
      <Route index element={<HomePage />}/>
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/product/:id" element={<ProductOverviewPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/shoppingCart" element={<ShoppingCartPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </>
  );
}

export default App;
