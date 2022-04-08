import React, { useState, useEffect } from "react";
import "./forgotPassword.css";
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
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import $ from "jquery";
import {
  clearErrors,
  forgotPassword,
} from "../../Actions/userActions";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();
  
  
    const { error, loading, message } = useSelector((state) => state.forgotPassword);
  
    const [email, setEmail] = useState("");
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
   
    useEffect(() => {
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (message) {
        // dispatch(forgotPassword());
        history(`/account`);
        alert.success("Password Updated Successfully");
     
      }
    }, [dispatch, error, alert, history, message]);
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`UPDATE PROFILE --> E-COMMERCE`} />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordBlock-1">
                  <h2>FORGOT PASSWORD</h2>
                  <hr />

                </div>
                <div className="d-flex flex-column forgotPasswordBlock-2">
                  <div className="forgotPassword">
                    <ForwardToInboxIcon className="forgotPasswordIcon" />
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </div>
                  
                  <input
                    type="submit"
                    value="Send Email"
                    className="forgotPasswordBtn"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ForgotPassword