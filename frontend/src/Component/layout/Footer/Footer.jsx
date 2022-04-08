import React from "react";
import playStore from "../../../../src/Images/playstore3.png";
import appStore from "../../../../src/Images/appstore2.png";
import "./Footer.css";
import logo from "../../../../src/Images/logo.png";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="row d-flex justify-content-center align-items-center w-100">
          <div className="leftFooter text-center col-sm-4 my-5">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <div className="my--3">
              <img src={playStore} className="playstore-logo" alt="" />
              <img src={appStore} className="appstore-logo" alt="" />
            </div>
          </div>
          <div className="midFooter text-center col-sm-4">
            <h1>
              <img src={logo} alt="" className="" />
            </h1>
            <p>High Quality is our first Priority</p>
            <p>Copyrights 2022 &copy; E-Commerce </p>
          </div>
          <div className="rightFooter col-sm-4">
            <h4>Follow Us</h4>
            <a
              href="https://www.instagram.com/_rishi__rathod_/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="/">Youtube</a>
            <a
              href="https://www.facebook.com/rishi.rathod.5891"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </footer>
      <footer id="footer2">
        <div className="row d-flex justify-content-center align-items-center w-100">
          <div className="leftFooter text-center col-sm-4 my-5">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <div className="my--3">
              <img src={playStore} className="playstore-logo" alt="" />
              <img src={appStore} className="appstore-logo" alt="" />
            </div>
          </div>

          <div className="rightFooter col-sm-4">
            <h4>Follow Us</h4>
            <a
              href="https://www.instagram.com/_rishi__rathod_/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="/">Youtube</a>
            <a
              href="https://www.facebook.com/rishi.rathod.5891"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
          <div className="midFooter text-center col-sm-4">
            <h1>
              <img src={logo} alt="" className="" />
            </h1>
            <p>High Quality is our first Priority</p>
            <p>Copyrights 2022 &copy; E-Commerce </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
