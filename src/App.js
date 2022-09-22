import "./App.css";
import Headers from "./components/layouts/Headers/Headers";
import Footers from "./components/layouts/Footers/Footers";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Headers />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
        <Footers />
      </BrowserRouter>
    </>
  );
}

export default App;
