import React from "react";
import { BackgroundImage } from "react-image-and-background-image-fade";
import { withRouter } from "react-router-dom";

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, thumbUrl }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${linkUrl}`)}
  >
    <BackgroundImage
      className="background-image"
      src={imageUrl}
      width="100%"
      height="100%"
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
    </div>
  </div>
);

export default withRouter(MenuItem);
