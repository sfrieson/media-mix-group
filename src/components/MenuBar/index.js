import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CloseIcon from "../CloseIcon";

import "./style.css";

function setBodyScroll(allow) {
  document.body.style.overflowY = allow ? "auto" : "hidden";
}

function GalleryFlyout(props) {
  const [isOpen, setStatus] = useState(false);

  useEffect(() => {
    setBodyScroll(!isOpen);
    return () => setBodyScroll(true);
  });

  const toggle = () => setStatus(!isOpen);
  return (
    <div className="menu__gallery__flyout">
      <button className="menu__gallery__flyout__button-open" onClick={toggle}>
        <span className="visually-hidden">View </span>Galleries
      </button>
      <div className={"menu__gallery__flyout__page" + (isOpen ? " open" : "")}>
        <button
          className="menu__gallery__flyout__button-close"
          onClick={toggle}
        >
          <span className="visually-hidden">Close</span>
          <CloseIcon />
        </button>
        <ul className="menu__gallery__list">{props.items}</ul>
      </div>
    </div>
  );
}

export default function MenuBar(props) {
  return (
    <nav className="menu__bar">
      <h2 className="visually-hidden">Menu</h2>
      <section className="menu__gallery__section">
        <h3 className="visually-hidden menu__gallery__header">Galleries</h3>
        <GalleryFlyout
          items={props.menu.items.map((gallery) => (
            <li className="menu__gallery__list-item" key={gallery.slug}>
              <NavLink
                to={"/" + gallery.slug}
                className="menu__gallery__link"
                activeClassName="menu__gallery__link--active"
              >
                {gallery.name}
              </NavLink>
            </li>
          ))}
        />
      </section>
      <NavLink to="/contact" className="menu__gallery__nav-link">
        Contact
      </NavLink>
    </nav>
  );
}
