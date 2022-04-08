import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../Images/logo.png";
import "./Header.css";

const options = {
  burgerColor: "#050505",
  burgerColorHover: "white",
  navColor1: "rgb(201 79 233)",
  logoWidth: "13vmax",
  logo: logo,
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1ColorHover: "white",
  link2ColorHover: "white",
  link3ColorHover: "white",
  link4ColorHover: "white",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1Color: "#050505",
  link1Family: "Fredoka",
  profileIconColor: "#050505",
  profileIconUrl: "/login",
  searchIconColor: "#050505",
  cartIconColor: "#050505",
  profileIconColorHover: "white",
  searchIconColorHover: "white",
  cartIconColorHover: "white",
  link1Size: "1.5rem",
  link2Margin: "1.5vmax",
  link3Margin: "0",
  link4Margin: "1.5vmax",
  searchIconMargin: "1vmax",
  cartIconMargin: "1vmax",
  profileIconMargin: "1vmax",
};

const Header = () => {
  return (
    <div className="header">
      <ReactNavbar className="overlayNavbar" {...options} />
    </div>
  );
};

export default Header;
