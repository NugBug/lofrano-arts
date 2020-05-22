import React from "react";
import CollectionItem from "../collection-item/collection-item.component.jsx";
import { Link } from "react-router-dom";

import "./colleciton-preview.styles.scss";

const CollectoinPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">
      <Link to={`gallery/${title.toLowerCase()}`}>{title.toUpperCase()}</Link>
    </h1>
    <div className="preview">
      {window.innerWidth > 1200 || window.innerWidth <=800 ? 
        items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        )) :
        items
        .filter((item, idx) => idx < 3)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))
        }
    </div>
  </div>
);

export default CollectoinPreview;
