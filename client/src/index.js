import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component.jsx";
import App from "./App";
import { store, persistor } from "./redux/store.js";
import HttpsRedirect from "react-https-redirect";

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <ScrollToTop />
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </HttpsRedirect>,
  document.getElementById("root")
);
