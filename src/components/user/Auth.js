import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Auth = () => {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switchTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo512.png");

  const { name, email, password } = user;

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

  const loginSubmit = () => {
    console.log("Login form submitted");
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

    console.log("Register form submitted");
  };

  return (
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
              value={password}
              onChange={registerOnChangeHandle}
            />
          </div>
          <div id="registerImage">
            <img src={avatarPreview} alt="Avatar preview" />
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
            // disabled={loading ? true : false}
          />
        </form>
      </div>
    </div>
  );
};

export default Auth;
