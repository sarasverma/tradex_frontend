import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  return (
    <>
      <MetaData title={`${user.name}'s profile`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profileContainer">
            <h1>My profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <Link to="/me/update">Edit profile</Link>
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
              <Link to="/orders">My orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
