import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as api from "./api";
import * as types from "./types";
import * as serviceWorker from "./serviceWorker";

Promise.resolve()
  .then(() => api.getEntryById(api.ids.menu))
  .then((menuData) => new types.MenuBar(menuData))
  .then((menu) =>
    ReactDOM.render(<App menu={menu} />, document.getElementById("root"))
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
