import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import CloseIcon from "../CloseIcon";

import "./style.css";
function setBodyScroll(allow) {
  document.body.style.overflowY = allow ? "auto" : "hidden";
}
export default function Lightbox(props) {
  useEffect(() => {
    setBodyScroll(false);
    return () => setBodyScroll(true);
  });

  return (
    <div className="lightbox">
      <Link className="lightbox__close" to={props.closeUrl}>
        <span className="visually-hidden">Close</span>
        <CloseIcon />
      </Link>
      <div className="lightbox__stage">
        <div className="lightbox__controls">
          {props.prevUrl && (
            <Link to={props.prevUrl} className="lightbox__controls__button">
              Prev
            </Link>
          )}
          {props.nextUrl && (
            <Link to={props.nextUrl} className="lightbox__controls__button">
              Next
            </Link>
          )}
        </div>
        {props.media && <props.media.Component {...props.media} />}
      </div>
    </div>
  );
}
