import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} /> 
      <Route path="/home" element={<p>a</p>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
