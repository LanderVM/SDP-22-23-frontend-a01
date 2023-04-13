import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import { SingleProductPage } from "./pages/SingleProductPage"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} /> 
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/product/:id" element={<SingleProductPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
