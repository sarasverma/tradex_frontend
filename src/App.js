import "./App.css";
import Headers from "./components/layouts/Headers/Headers";
import Footers from "./components/layouts/Footers/Footers";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Headers />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
        <Footers />
      </BrowserRouter>
    </>
  );
}

export default App;
