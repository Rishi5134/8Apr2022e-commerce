import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import $ from "jquery";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../Actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/User_Icon.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // const redirect = location.search ? location.search.split("=")[1] : "/account";

 
  $("#uploadImageChange").click(function() {
    $("#avatarChange").trigger("click");
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(loadUser());
      history(`/account`);
      alert.success("Profile Updated Successfully");
      dispatch({
        type: UPDATE_PROFILE_RESET,
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
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileBlock-1">
                  <h2>Update Profile</h2>
                  <hr />
                  <div id="updateProfileImage">
                    <img
                    
                      id="uploadImageChange"
                      className="updateProfileImagePreview"
                      src={avatarPreview}
                      alt="Avatar Preview"
                    />
                    <PermIdentityOutlinedIcon className="changeImageIcon" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      id="avatarChange"
                      className="updateProfileImageInput"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column updateProfileBlock-2">
                  <div className="updateProfileName">
                    <h4>Full Name</h4>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <EditIcon className="editIcon" />
                  </div>
                  <div className="updateProfileEmail">
                    <h4>Email</h4>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <EditIcon className="editIcon" />
                  </div>
                  <input
                    type="submit"
                    value="Save Changes"
                    className="updateProfileBtn"
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

export default UpdateProfile;
