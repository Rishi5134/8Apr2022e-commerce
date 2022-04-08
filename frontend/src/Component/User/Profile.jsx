import React from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <MetaData title={`${user.name}'s --> Profile`} />
      <div className="userProfile">
        <div className="userProfile-block1">
          <h1>My Profile</h1>
          <hr />
          <div className="text-center d-flex flex-column align-items-center">
            <img src={user.avatar.url} alt="" />

            <Link className="edit-profile" to="/me/update">
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="userProfile-block2">
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substring(0, 10)}</p>
          </div>
          <div>
            <h4>Role</h4>
            <p>{user.role}</p>
          </div>
          <div className="d-flex flex-column">
            <Link to="/orders/me" className="my-orders">
              My Orders
            </Link>
            <Link to="/password/update" className="change-password">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
