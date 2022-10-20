import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdatePassword.css";
import { BsFillKeyFill } from "react-icons/bs";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../states/actions/userAction";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader/Loader";
import { UPDATE_PASSWORD_RESET } from "../../states/constants/userConstants";
import MetaData from "../layouts/MetaData";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      navigate("/account");
      // for making isUpdated false(and we are calling like this as we have not created any action that will triger reset)
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  return (
    <>
      <MetaData title="Change password" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Change password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <BsFillKeyFill />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="loginPassword">
                  <AiFillUnlock />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="loginPassword">
                  <AiFillLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <input
                  type="submit"
                  value="Change password"
                  className="updatePasswordBtn btn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
