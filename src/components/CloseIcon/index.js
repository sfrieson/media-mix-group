import React from "react";

export default function CloseIcon(props) {
  return (
    <svg
      {...props}
      className={`close-x ${props.className || ""}`}
      viewBox="0 0 40 40"
    >
      <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  );
}
