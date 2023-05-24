import React from "react";
import { Link } from "react-router-dom";

import MenuBar from "../MenuBar";
import logo from "../../media-mix-logo.svg";

import "./style.css";

export default function Header(props) {
  return (
    <header className="header contain">
      <h1 className="logo-container">
        <Link to="/">
          <img
            className="logo-image"
            src={logo}
            alt="Ken Frieson Photography and Videography"
          />
        </Link>
      </h1>
      <MenuBar key={props.location.key} menu={props.menu} />
    </header>
  );
}
