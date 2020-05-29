const INITIAL_STATE = {
  sections: [
    {
      title: "sculptures",
      imageUrl:
        "https://cdn20.pamono.com/p/g/5/6/561199_0ggih44unq/art-deco-bronze-sculpture-by-g-ninin-1920s-2.jpg",
      id: 1,
      linkUrl: "gallery/sculptures",
    },
    {
      title: "photography",
      imageUrl:
        "https://iso.500px.com/wp-content/uploads/2016/10/stock-photo-159358357.jpg",
      id: 2,
      linkUrl: "/gallery/photography",
    },
    {
      title: "paintings",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/716tsQsStCL._SX500_.jpg",
      id: 3,
      linkUrl: "/gallery/paintings",
    },
    {
      title: "sketches",
      imageUrl: "https://i.ytimg.com/vi/Q_PZ09Qlssw/maxresdefault.jpg",
      size: "large",
      id: 4,
      linkUrl: "/gallery/sketches",
    },
    {
      title: "prints",
      imageUrl:
        "https://ctl.s6img.com/society6/img/lE7CIxh0oMhqbJbOv5B6Wb4RvmA/w_1500/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/e10314df891140139e659371eb9cc524/~~/beach-mood1217848-prints.jpg",
      size: "large",
      id: 5,
      linkUrl: "/gallery/prints",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
