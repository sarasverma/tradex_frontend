import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  let navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/auth");
    }
  }, [navigate, isAuthenticated]);
  return (
    <>
      <MetaData title={`Your's profile`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s profile`} />
          <div className="profileContainer">
            <div>
              <h1>My profile</h1>
              {Object.keys(user).length === 0 ? (
                <FaUser />
              ) : (
                <img src={user.avatar.url} alt={user.name} />
              )}
              <Link to="/me/update" className="btn">
                Edit profile
              </Link>
            </div>
            <div>
              <div>
                <h4>Full name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <Link to="/orders" className="btn">
                  My orders
                </Link>
                <Link to="/password/update" className="btn">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
