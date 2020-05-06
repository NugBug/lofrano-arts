import React from "react";
import Directory from "../../components/directory/directory.component";

import "./homepage.styles.scss";

const HomePage = () => (
  <div className="homepage">
    <div id="hero">
      <h1>Lofrano Arts</h1>
    </div>
    <Directory />
  </div>
);

export default HomePage;
