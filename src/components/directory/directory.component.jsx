import React from "react";
import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "sculptures",
          imageUrl: "https://cdn20.pamono.com/p/g/5/6/561199_0ggih44unq/art-deco-bronze-sculpture-by-g-ninin-1920s-2.jpg",
          id: 1,
          linkUrl: "shop/sculptures",
        },
        {
          title: "photography",
          imageUrl: "https://iso.500px.com/wp-content/uploads/2016/10/stock-photo-159358357.jpg",
          id: 2,
          linkUrl: "shop/photography",
        },
        {
          title: "paintings",
          imageUrl: "https://images-na.ssl-images-amazon.com/images/I/716tsQsStCL._SX500_.jpg",
          id: 3,
          linkUrl: "shop/paintings",
        },
        {
          title: "sketches",
          imageUrl: "https://i.ytimg.com/vi/Q_PZ09Qlssw/maxresdefault.jpg",
          size: "large",
          id: 4,
          linkUrl: "shop/sketches",
        },
        {
          title: "prints",
          imageUrl: "https://ctl.s6img.com/society6/img/lE7CIxh0oMhqbJbOv5B6Wb4RvmA/w_1500/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/e10314df891140139e659371eb9cc524/~~/beach-mood1217848-prints.jpg",
          size: "large",
          id: 5,
          linkUrl: "shop/prints",
        },
      ],
    };
  }

  render() {
    return (
    <div className="directory-menu">
      {
        this.state.sections.map(({ id, ...sectionProps }) => (
          <MenuItem key={id} {...sectionProps} />
        ))
      }
    </div>
    )
  }
}

export default Directory;
