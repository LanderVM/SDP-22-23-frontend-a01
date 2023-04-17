import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import {HomePage, NotFoundPage, ProductOverviewPage, ProductsPage, ProfilePage} from "./pages";
import ScrollToTop from "./Contexts/ScrollToTop";
import ShoppingCartPage from "./Pages/ShoppingCartPage";

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
