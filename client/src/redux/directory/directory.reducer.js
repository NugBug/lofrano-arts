const INITIAL_STATE = {
  sections: [
    {
      title: "drawings",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FMorning%20Commute%201_1593286233553_display?alt=media&token=d7b84fc3-a8ca-4554-820d-7ae44ecae72c",
      id: 4,
      linkUrl: "/gallery/drawings",
    },
    {
      title: "sculptures",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FNegative%20Cubes_display?alt=media&token=fd0c258c-65f2-4324-8cbf-265e28504692",
      id: 1,
      linkUrl: "gallery/sculptures",
    },
    {
      title: "digital art",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FStreet%20Car_1593286530167_display?alt=media&token=a2a65460-36b2-42ac-a851-86758647d494",
      id: 5,
      linkUrl: "/gallery/digital%20art",
    },
    {
      title: "photography",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FEspresso_1594662951124_display?alt=media&token=918a4998-da93-4554-93cf-353ff748fb56",
      id: 2,
      linkUrl: "/gallery/photography",
      // size: "large",
    },
    // {
    //   title: "musings",
    //   imageUrl:
    //     "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FGlass_1598210739542_display?alt=media&token=a564b098-b1df-4e80-b3d8-51ef92782ebd",
    //   id: 3,
    //   linkUrl: "/gallery/musings",
    //   size: "large",
    // },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
