import "./App.css";
import Headers from "./components/Headers/Headers";
import Footers from "./components/Footers/Footers";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Headers />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footers />
      </BrowserRouter>
    </>
  );
}

export default App;
