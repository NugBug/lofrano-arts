import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store.js";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL || "lofrano-arts"}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
