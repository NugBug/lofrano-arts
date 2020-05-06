import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component.jsx";

import "./App.css";

const SculpturesPage = () => (
  <div className="sculptures-page">
    <h1>Sculptures</h1>
  </div>
);

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop/sculptures" component={SculpturesPage} />
      </Switch>
    </div>
  );
}

export default App;
