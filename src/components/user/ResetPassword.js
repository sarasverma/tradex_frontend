import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../states/actions/userAction";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  let { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password updated successfully");
      navigate("/account");
    }
  }, [dispatch, error, alert, navigate, success]);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  return (
    <>
      <MetaData title="Reset password" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <AiFillUnlock />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
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
                  value="Reset"
                  className="resetPasswordBtn btn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
