const INITIAL_STATE = {
  sections: [
    {
      title: "sculptures",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FNegative%20Cubes_thumb?alt=media&token=d9bd4ce6-4f24-4bb3-827f-c86ca47163a1",
      id: 1,
      linkUrl: "gallery/sculptures",
    },
    {
      title: "photography",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FEspresso_1594662951124_display?alt=media&token=918a4998-da93-4554-93cf-353ff748fb56",
      id: 2,
      linkUrl: "/gallery/photography",
    },
    {
      title: "musings",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FSculpture%20Work_thumb?alt=media&token=1f2a8c0b-fec6-4883-a959-6e8c0b17f829",
      id: 3,
      linkUrl: "/gallery/musings",
    },
    {
      title: "drawings",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FMorning%20Commute_thumb?alt=media&token=5a4be8b3-4f30-46c7-8146-3b53c2cc671f",
      size: "large",
      id: 4,
      linkUrl: "/gallery/drawings",
    },
    {
      title: "digital art",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FCable%20Car_display?alt=media&token=da2fbb3d-5543-49ee-8a43-07698fb45e76",
      size: "large",
      id: 5,
      linkUrl: "/gallery/digital%20art",
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
