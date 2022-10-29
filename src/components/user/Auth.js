import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../states/actions/userAction";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";

const Auth = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switchTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const { name, email, password } = user;

  console.log(location.search);
  const redirect = location.search
    ? `/${location.search.split("=")[1]}`
    : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switchTab.current.classList.add("shiftToNeutral");
      switchTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else if (tab === "register") {
      switchTab.current.classList.remove("shiftToNeutral");
      switchTab.current.classList.add("shiftToRight");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerOnChangeHandle = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: [e.target.value] });
    }
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  return (
    <>
      <MetaData title="Tradex | Auth" />
      {loading ? (
        <Loader />
      ) : (
        <div className="authContainer">
          <div className="authBox">
            <div>
              <div className="auth_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                <p onClick={(e) => switchTabs(e, "register")}>Register</p>
              </div>
              <button ref={switchTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MdEmail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <MdPassword />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot password</Link>
              <input type="submit" value="Login" className="loginBtn btn" />
            </form>
            <form
              className="registerForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="registerName">
                <FaUser />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerOnChangeHandle}
                />
              </div>
              <div className="registerEmail">
                <MdEmail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerOnChangeHandle}
                />
              </div>
              <div className="loginPassword">
                <MdPassword />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerOnChangeHandle}
                />
              </div>
              <div id="registerImage">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" />
                ) : (
                  <>
                    <h1>
                      <AiOutlineUserAdd />
                    </h1>
                  </>
                )}
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerOnChangeHandle}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="registerBtn btn"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
