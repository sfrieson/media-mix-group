import React from "react";

import "./style.css";

export default function Loading(props) {
  return (
    <div className="loading-container" {...props}>
      <div className="loading-text">Loading...</div>
    </div>
  );
}
