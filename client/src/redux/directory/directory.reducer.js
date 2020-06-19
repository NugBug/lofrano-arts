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
        "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/14726463_225276121223510_283839399156776960_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=uNZ7FdaArHYAX8KJ_n2&oh=b5864821f0ae6cc3c923583c9bebbddf&oe=5F17F7EA",
      id: 2,
      linkUrl: "/gallery/photography",
    },
    {
      title: "musings",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FSculpture%20Work_display?alt=media&token=7e4954f7-f13c-47a4-9d45-37b5df041d59",
      id: 3,
      linkUrl: "/gallery/musings",
    },
    {
      title: "drawings",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FMorning%20Commute_display?alt=media&token=feee41da-0676-4acc-b1c9-e9baea47a986",
      size: "large",
      id: 4,
      linkUrl: "/gallery/drawings",
    },
    {
      title: "digital art",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FCable%20Car_display?alt=media&token=14574d19-94fd-4329-9f96-1d73ee92c8b2",
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
