import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../states/actions/userAction";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader/Loader";
import { UPDATE_PROFILE_RESET } from "../../states/constants/userConstants";
import MetaData from "../layouts/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar.url) setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());
      navigate("/account");
      // for making is updated false --- and we are calling like this as we have not created any action that will triger reset
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated, user]);

  const updateProfileOnChangeHandle = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  return (
    <>
      <MetaData title="Update profile" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaUser />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage">
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
                    onChange={updateProfileOnChangeHandle}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn btn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
