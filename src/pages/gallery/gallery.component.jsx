import React from "react";
import CollectionPreview from "../../components/collection-preview/collectoin-preview.component"

import GALLERY_DATA from "./gallery.data.js";

class GalleryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: GALLERY_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="gallery-page">
      {
        collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))
      }
      </div>  
    ) 
  }
}

export default GalleryPage;