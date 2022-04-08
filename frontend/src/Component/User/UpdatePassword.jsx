import React, { useState, useEffect } from "react";
import "./updatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import $ from "jquery";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../Actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../Constants/userConstants";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };
  // if ($('#oldPassword').type === "password") {
  //   $('#updatePasswordIcon').click(function (){
  //     $('#oldPassword').type === "text"
  //   })
  // }
  function viewOldPassword() {
    var x = document.getElementById("oldPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  function viewNewPassword() {
    var x = document.getElementById("newPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  function viewConfirmPassword() {
    var x = document.getElementById("confirmPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(loadUser());
      history(`/account`);
      alert.success("Password Updated Successfully");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`UPDATE PROFILE --> E-COMMERCE`} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="updatePasswordBlock-1">
                  <h2>UPDATE PASSWORD</h2>
                  <hr />

                </div>
                <div className="d-flex flex-column updatePasswordBlock-2">
                  <div className="updatePassword">
                    <LockClockOutlinedIcon className="updatePasswordIcon" />
                    <input
                      type="password"
                      placeholder="Old Password"
                      required
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}

                    />
                    <RemoveRedEyeOutlinedIcon className="visibilityIcon" onClick={() => { viewOldPassword() }} id="oldPasswordIcon" />
                  </div>
                  <div className="updatePassword">
                    <LockOpenOutlinedIcon className="updatePasswordIcon" />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <RemoveRedEyeOutlinedIcon className="visibilityIcon" onClick={() => { viewNewPassword() }} id="newPasswordIcon" />

                  </div>
                  <div className="updatePassword">
                    <LockOutlinedIcon className="updatePasswordIcon" />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <RemoveRedEyeOutlinedIcon className="visibilityIcon" onClick={() => { viewConfirmPassword() }} id="confirmPasswordIcon" />

                  </div>

                  <input
                    type="submit"
                    value="Change Password"
                    className="updatePasswordBtn"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
