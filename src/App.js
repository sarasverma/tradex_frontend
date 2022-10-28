import "./App.css";
import Headers from "./components/layouts/Headers/Headers";
import Footers from "./components/layouts/Footers/Footers";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Auth from "./components/user/Auth";
import { useEffect } from "react";
import { store } from "./states/store";
import { loadUser } from "./states/actions/userAction";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";

function App() {
  useEffect(() => {
    // another method to dispatch
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Headers />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetail />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route exact path="/auth" element={<Auth />} />
            <Route
              exact
              path="/account"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footers />
      </BrowserRouter>
    </>
  );
}

export default App;
